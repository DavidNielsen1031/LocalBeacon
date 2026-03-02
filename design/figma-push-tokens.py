#!/usr/bin/env python3
"""Push LocalBeacon design tokens to a Figma file via Variables API.

Usage: python3 figma-push-tokens.py <FIGMA_FILE_ID>

Requires: FIGMA_ACCESS_TOKEN env var
"""

import json
import os
import sys
import urllib.request
import urllib.error

TOKEN = os.environ.get("FIGMA_ACCESS_TOKEN")
if not TOKEN:
    print("ERROR: Set FIGMA_ACCESS_TOKEN")
    sys.exit(1)

if len(sys.argv) < 2:
    print("Usage: python3 figma-push-tokens.py <FIGMA_FILE_ID>")
    sys.exit(1)

FILE_ID = sys.argv[1]
HEADERS = {"X-Figma-Token": TOKEN, "Content-Type": "application/json"}

def figma_request(method, path, data=None):
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(
        f"https://api.figma.com/v1{path}",
        data=body, headers=HEADERS, method=method
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        print(f"HTTP {e.code}: {err_body}")
        raise

# Design tokens
COLORS = {
    "Primary/Beacon Orange": {"r": 1.0, "g": 0.42, "b": 0.21, "a": 1},       # #FF6B35
    "Primary/Deep Navy": {"r": 0.106, "g": 0.165, "b": 0.29, "a": 1},         # #1B2A4A
    "Secondary/Sky Blue": {"r": 0.302, "g": 0.671, "b": 0.969, "a": 1},        # #4DABF7
    "Background/Warm White": {"r": 0.98, "g": 0.98, "b": 0.969, "a": 1},       # #FAFAF7
    "Background/Cream": {"r": 1.0, "g": 0.973, "b": 0.941, "a": 1},            # #FFF8F0
    "Neutral/Charcoal": {"r": 0.176, "g": 0.204, "b": 0.212, "a": 1},          # #2D3436
    "Neutral/Slate": {"r": 0.388, "g": 0.431, "b": 0.447, "a": 1},             # #636E72
    "Neutral/Mist": {"r": 0.875, "g": 0.902, "b": 0.914, "a": 1},              # #DFE6E9
    "Neutral/Cloud": {"r": 0.945, "g": 0.953, "b": 0.961, "a": 1},             # #F1F3F5
    "Semantic/Success": {"r": 0.0, "g": 0.722, "b": 0.58, "a": 1},             # #00B894
    "Semantic/Warning": {"r": 0.992, "g": 0.796, "b": 0.431, "a": 1},          # #FDCB6E
    "Semantic/Error": {"r": 0.882, "g": 0.439, "b": 0.333, "a": 1},            # #E17055
}

NUMBERS = {
    "Spacing/xs": 4,
    "Spacing/sm": 8,
    "Spacing/md": 16,
    "Spacing/lg": 24,
    "Spacing/xl": 32,
    "Spacing/2xl": 48,
    "Spacing/3xl": 64,
    "Spacing/4xl": 96,
    "Spacing/5xl": 128,
    "Radius/sm": 8,
    "Radius/md": 12,
    "Radius/lg": 16,
    "Radius/full": 9999,
}

print(f"Pushing design tokens to Figma file: {FILE_ID}")
print()

# Step 1: Get existing variables
print("Fetching existing variables...")
existing = figma_request("GET", f"/files/{FILE_ID}/variables/local")
print(f"Found {len(existing.get('meta', {}).get('variables', {}))} existing variables")

# Step 2: Build the variable creation payload
# We need to create a variable collection first, then add variables
payload = {
    "variableCollections": [
        {
            "action": "CREATE",
            "id": "localbeacon-tokens",
            "name": "LocalBeacon Design Tokens",
            "initialModeId": "default-mode",
        }
    ],
    "variableModes": [
        {
            "action": "CREATE",
            "id": "default-mode",
            "name": "Default",
            "variableCollectionId": "localbeacon-tokens",
        }
    ],
    "variables": [],
    "variableModeValues": [],
}

# Add color variables
for name, rgba in COLORS.items():
    var_id = f"color-{name.replace('/', '-').replace(' ', '-').lower()}"
    payload["variables"].append({
        "action": "CREATE",
        "id": var_id,
        "name": name,
        "variableCollectionId": "localbeacon-tokens",
        "resolvedType": "COLOR",
    })
    payload["variableModeValues"].append({
        "variableId": var_id,
        "modeId": "default-mode",
        "value": rgba,
    })

# Add number variables
for name, value in NUMBERS.items():
    var_id = f"num-{name.replace('/', '-').replace(' ', '-').lower()}"
    payload["variables"].append({
        "action": "CREATE",
        "id": var_id,
        "name": name,
        "variableCollectionId": "localbeacon-tokens",
        "resolvedType": "FLOAT",
    })
    payload["variableModeValues"].append({
        "variableId": var_id,
        "modeId": "default-mode",
        "value": value,
    })

print(f"Pushing {len(COLORS)} colors + {len(NUMBERS)} numbers...")

try:
    result = figma_request("POST", f"/files/{FILE_ID}/variables", payload)
    print("✅ Design tokens pushed successfully!")
    print(f"  Colors: {len(COLORS)}")
    print(f"  Numbers: {len(NUMBERS)}")
    print(f"  Collection: LocalBeacon Design Tokens")
    print()
    print(f"Open in Figma: https://www.figma.com/design/{FILE_ID}")
except Exception as e:
    print(f"❌ Failed to push tokens: {e}")
    print()
    print("This might be because:")
    print("1. The file doesn't exist or you don't have edit access")
    print("2. Your token doesn't have file_write scope")
    print("3. The file is in a free team (Variables API requires paid Figma)")
    sys.exit(1)
