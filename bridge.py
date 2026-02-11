import asyncio
import aiohttp
import random

# --- CONFIGURATION ---
# Put all your free HF tokens here
HF_TOKENS = [
    "hf_Token1",
    "hf_Token2",
    "hf_Token3"
]

# Target Model
MODEL_ID = "Gryphe/MythoMax-L2-13b"
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"

async def query_model(session, payload):
    # Rotate token
    token = random.choice(HF_TOKENS)
    headers = {"Authorization": f"Bearer {token}"}

    async with session.post(API_URL, headers=headers, json=payload) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        # Simulate 6 concurrent sessions
        tasks = []
        for i in range(6):
            payload = {
                "inputs": f"Session {i}: Tell me a secret.",
                "parameters": {"max_new_tokens": 50}
            }
            tasks.append(query_model(session, payload))

        # Fire all at once
        responses = await asyncio.gather(*tasks)

        for i, res in enumerate(responses):
            print(f"--- Session {i} ---")
            if isinstance(res, list):
                print(res[0].get('generated_text'))
            else:
                print("Error:", res)

if __name__ == "__main__":
    asyncio.run(main())
