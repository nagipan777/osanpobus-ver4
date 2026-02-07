from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import os
import json

app = FastAPI(title="蟹江お散歩バス時刻表")

# 静的ファイルのディレクトリを設定
current_dir = os.path.dirname(os.path.abspath(__file__))

# ルートパスでindex.htmlを返す
@app.get("/")
async def read_root():
    return FileResponse(os.path.join(current_dir, "index.html"), media_type="text/html")

# 静的ファイル（CSS, JS, JSON）を配信
@app.get("/style.css")
async def get_css():
    return FileResponse(os.path.join(current_dir, "style.css"), media_type="text/css")

@app.get("/app.js")
async def get_js():
    return FileResponse(os.path.join(current_dir, "app.js"), media_type="application/javascript")

@app.get("/timetable_data.json")
async def get_data():
    with open(os.path.join(current_dir, "timetable_data.json"), "r", encoding="utf-8") as f:
        data = json.load(f)
    return JSONResponse(content=data)

# ヘルスチェック用エンドポイント
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Vercel用のハンドラー
handler = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
