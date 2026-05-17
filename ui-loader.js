(function() {
    if (document.getElementById('gh-automation-ui')) return;

    // --- LOGIC XỬ LÝ DỮ LIỆU ---
    window.robustCSVParser = function(line) {
        const result = [];
        let curVal = "", inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i], nextChar = line[i + 1];
            if (char === '"' && inQuotes && nextChar === '"') { curVal += '"'; i++; }
            else if (char === '"') { inQuotes = !inQuotes; }
            else if (char === ',' && !inQuotes) { result.push(curVal.trim()); curVal = ""; }
            else { curVal += char; }
        }
        result.push(curVal.trim());
        return result;
    };

    window.fetchAndRun = async function(targetStt) {
        const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
        try {
            const res = await fetch(csvUrl + '?t=' + Date.now());
            const rows = (await res.text()).split(/\r?\n/);
            let found = false;

            for (let row of rows) {
                const cols = robustCSVParser(row);
                const currentStt = cols[2] ? cols[2].replace(/"/g, "").trim() : "";

                if (currentStt === targetStt.toString().trim()) {
                    found = true;
                    // 1. Chạy mã localStorage (Cột D)
                    const cleanCode = cols[3].replace(/^"|"$/g, '').replace(/""/g, '"');
                    eval(cleanCode);

                    // 2. Lấy dữ liệu bổ sung (Cột E và F)
                    const extraData1 = cols[4] ? cols[4].replace(/"/g, "").trim() : "N/A";
                    const extraData2 = cols[5] ? cols[5].replace(/"/g, "").trim() : "N/A";

                    // 3. Hiển thị các nút dán nhanh
                    updateQuickButtons(extraData1, extraData2);
                    
                    alert("Đã cấu hình xong STT: " + targetStt);
                    break;
                }
            }
            if (!found) alert("Không tìm thấy STT này!");
        } catch (e) { console.error("Lỗi:", e); }
    };

    // Hàm dán văn bản vào ô input đang focus
    window.quickPaste = function(text) {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
            activeEl.value = text;
            activeEl.dispatchEvent(new Event('input', { bubbles: true })); // Kích hoạt sự kiện thay đổi
            console.log("Đã dán: " + text);
        } else {
            alert("Vui lòng click vào ô cần dán trước!");
        }
    };

    // Hàm cập nhật nút bấm động
    function updateQuickButtons(data1, data2) {
        const container = document.getElementById('gh-dynamic-buttons');
        container.innerHTML = `
            <div style="margin-top: 10px; border-top: 1px dashed #555; padding-top: 10px;">
                <button onclick="quickPaste('${data1}')" style="width: 100%; background: #f39c12; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; margin-bottom: 5px; font-size: 11px;">
                    Dán: ${data1}
                </button>
                <button onclick="quickPaste('${data2}')" style="width: 100%; background: #9b59b6; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                    Dán: ${data2}
                </button>
            </div>
        `;
    }

    // --- GIAO DIỆN (UI) ---
    const ui = document.createElement('div');
    ui.id = 'gh-automation-ui';
    ui.innerHTML = `
        <div style="position: fixed; top: 10px; right: 10px; z-index: 2147483647; 
                    background: #1a1a1a; color: #ecf0f1; border-radius: 10px; 
                    padding: 15px; width: 220px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    font-family: Arial, sans-serif;">
            <div style="font-weight: bold; border-bottom: 1px solid #333; margin-bottom: 10px; color: #3498db;">
                🛠 CONFIG SYSTEM
            </div>
            <input type="text" id="gh-input-stt" placeholder="Nhập STT..." 
                   style="width: 100%; padding: 7px; margin-bottom: 8px; border-radius: 4px; border: 1px solid #444; background: #222; color: white;">
            <button id="gh-btn-run" style="width: 100%; background: #3498db; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                QUÉT DỮ LIỆU
            </button>
            
            <!-- Nơi chứa các nút dán nhanh sẽ xuất hiện sau khi quét -->
            <div id="gh-dynamic-buttons"></div>

            <button onclick="document.getElementById('gh-automation-ui').remove()" 
                    style="background:none; border:none; color:#7f8c8d; cursor:pointer; width:100%; margin-top:15px; font-size:10px;">
                [ Đóng ]
            </button>
        </div>
    `;
    document.body.appendChild(ui);

    document.getElementById('gh-btn-run').onclick = () => {
        const val = document.getElementById('gh-input-stt').value;
        if (val) window.fetchAndRun(val);
    };
})();
