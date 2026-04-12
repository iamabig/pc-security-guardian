import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def main():
    # Start the dev server
    server = subprocess.Popen(["npm", "run", "dev"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(5) # Wait for server to start

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:3000")
            await page.wait_for_selector("h1")
            await page.screenshot(path="command_center.png")
            print("Screenshot saved: command_center.png")

            # Check for key elements
            title = await page.inner_text("h1")
            if "Security Command Center" in title:
                print("UI Verification: Title found.")

            monitor = await page.is_visible("text=Live Packet Monitoring")
            if monitor:
                print("UI Verification: Packet Monitor visible.")

            metrics = await page.is_visible("text=Analysis Focus Metrics")
            if metrics:
                print("UI Verification: Metric Selector visible.")

        except Exception as e:
            print(f"UI Verification failed: {e}")
        finally:
            await browser.close()
            server.terminate()

if __name__ == "__main__":
    asyncio.run(main())
