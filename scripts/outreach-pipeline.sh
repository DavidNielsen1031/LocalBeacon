#!/bin/bash
# Full outreach pipeline: Find prospects → Scan them → Generate outreach list
#
# Usage:
#   bash scripts/outreach-pipeline.sh "plumber" "Burnsville MN"
#   bash scripts/outreach-pipeline.sh "hvac" "Eagan MN"
#
# Output: data/outreach/YYYY-MM-DD-{industry}-{city}.json

set -euo pipefail

INDUSTRY="${1:?Usage: $0 <industry> <city>}"
CITY="${2:?Usage: $0 <industry> <city>}"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "${INDUSTRY}-${CITY}" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

source ~/.config/env/global.env 2>/dev/null || true

PROSPECT_FILE="data/prospects/${DATE}-${SLUG}.json"
SCAN_FILE="data/scan-results/${DATE}-${SLUG}.json"
OUTREACH_FILE="data/outreach/${DATE}-${SLUG}.json"

echo "═══════════════════════════════════════════"
echo "  Outreach Pipeline: ${INDUSTRY} in ${CITY}"
echo "═══════════════════════════════════════════"

# Step 1: Find prospects
echo ""
echo "Step 1: Finding prospects..."
npx tsx scripts/find-prospects.ts \
  --industry "$INDUSTRY" \
  --city "$CITY" \
  --output "$PROSPECT_FILE"

# Extract URLs from prospects
URLS=$(python3 -c "
import json
data = json.load(open('$PROSPECT_FILE'))
for p in data['prospects']:
    print(p['url'])
")

URL_COUNT=$(echo "$URLS" | wc -l | tr -d ' ')
echo "  Found $URL_COUNT prospect URLs"

# Step 2: Batch scan
echo ""
echo "Step 2: Scanning all prospects..."
echo "$URLS" | npx tsx scripts/batch-scan.ts --stdin --output "$SCAN_FILE"

# Step 3: Generate outreach list (sorted by score, low first = most opportunity)
echo ""
echo "Step 3: Generating outreach list..."
python3 -c "
import json
from datetime import datetime

prospects = json.load(open('$PROSPECT_FILE'))
scans = json.load(open('$SCAN_FILE'))

# Match scans to prospects
prospect_map = {}
for p in prospects['prospects']:
    from urllib.parse import urlparse
    domain = urlparse(p['url']).hostname.replace('www.', '')
    prospect_map[domain] = p

results = []
for scan in scans:
    from urllib.parse import urlparse
    domain = urlparse(scan['url']).hostname.replace('www.', '')
    prospect = prospect_map.get(domain, {})
    results.append({
        'name': prospect.get('name', domain),
        'url': scan['url'],
        'domain': domain,
        'score': scan['score'],
        'grade': scan['grade'],
        'passed': scan['passed'],
        'failed': scan['failed'],
        'total': scan['total'],
        'topIssues': [c['label'] for c in scan.get('checks', []) if not c['passed']][:5],
        'error': scan.get('error'),
    })

# Sort by score (lowest first = biggest opportunity)
results.sort(key=lambda x: x['score'])

# Find the top scorer as the comparison business
top = max(results, key=lambda x: x['score']) if results else None

output = {
    'industry': '$INDUSTRY',
    'city': '$CITY',
    'generatedAt': datetime.now().isoformat(),
    'totalProspects': len(results),
    'averageScore': round(sum(r['score'] for r in results) / len(results)) if results else 0,
    'topScorer': {
        'name': top['name'],
        'url': top['url'],
        'score': top['score'],
    } if top else None,
    'prospects': results,
}

json.dump(output, open('$OUTREACH_FILE', 'w'), indent=2)
print(f'  Outreach list saved: $OUTREACH_FILE')
print(f'  Total: {len(results)} prospects')
print(f'  Average score: {output[\"averageScore\"]}/100')
if top:
    print(f'  Top scorer: {top[\"name\"]} ({top[\"score\"]}/100)')
print()
print('  Score distribution:')
for grade in ['A', 'B', 'C', 'D', 'F']:
    count = sum(1 for r in results if r['grade'] == grade)
    if count > 0:
        print(f'    {grade}: {count}')
"

echo ""
echo "Done! Next: review $OUTREACH_FILE and run the email script."
