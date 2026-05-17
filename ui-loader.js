(function() {
    // Ngăn chặn tạo nhiều giao diện trùng lặp
    if (document.getElementById('github-ui-container')) return;

    // 1. Tạo giao diện UI
    const div = document.createElement('div');
    div.id = 'github-ui-container';
    div.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 999999; 
                    background: #2c3e50; color: white; border-radius: 10px; 
                    padding: 15px; width: 200px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                    font-family: sans-serif;">
            <div style="font-weight: bold; border-bottom: 1px solid #555; margin-bottom: 10px;">🛠 GitHub Control</div>
            <button id="btn-action-1" style="width: 100%; margin-bottom: 5px; cursor: pointer;">Chạy logic 1</button>
            <button id="btn-action-2" style="width: 100%; cursor: pointer;">Chạy logic 2</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#bdc3c7; cursor:pointer; width:100%; margin-top:10px; font-size:11px;">[ Đóng ]</button>
        </div>
    `;
    document.body.appendChild(div);

    // 2. Gán sự kiện cho các nút
    document.getElementById('btn-action-1').onclick = () => {
        console.log("Đang chạy logic từ GitHub...");
        // Gọi hàm fetchAndRun của bạn ở đây
    };
})();
