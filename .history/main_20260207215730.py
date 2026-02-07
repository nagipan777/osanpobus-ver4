from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="蟹江お散歩バス時刻表")

# 静的ファイルのディレクトリを設定
current_dir = os.path.dirname(os.path.abspath(__file__))

# ルートパスでindex.htmlを返す
@app.get("/")
async def read_root():
    return FileResponse(os.path.join(current_dir, "index.html"))

# 静的ファイル（CSS, JS, JSON）を配信
@app.get("/style.css")
async def get_css():
    return FileResponse(os.path.join(current_dir, "style.css"))

@app.get("/app.js")
async def get_js():
    return FileResponse(os.path.join(current_dir, "app.js"))

@app.get("/timetable_data.json")
async def get_data():
    return FileResponse(os.path.join(current_dir, "timetable_data.json"))

# ヘルスチェック用エンドポイント
@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
