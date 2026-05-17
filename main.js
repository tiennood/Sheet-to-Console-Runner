/**
 * Hàm phân tách CSV an toàn (không bị lỗi bởi dấu phẩy trong JSON)
 */
function parseCSVLine(text) {
    let columns = [];
    let curVal = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let nextChar = text[i + 1];

        if (inQuotes && char === '"' && nextChar === '"') {
            curVal += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            columns.push(curVal.trim());
            curVal = "";
        } else {
            curVal += char;
        }
    }
    columns.push(curVal.trim());
    return columns;
}

/**
 * Hàm chính để tìm và chạy mã
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Bắt đầu quét STT: ${targetStt}`, "color: #3498db; font-weight: bold;");
        
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // Tách hàng và loại bỏ ký tự xuống dòng của Windows (\r)
        const rows = csvText.split(/\r?\n/);
        let found = false;

        for (let row of rows) {
            if (!row.trim()) continue;

            const cols = parseCSVLine(row);

            // Cột C là index 2, làm sạch khoảng trắng
            const currentStt = cols[2] ? cols[2].replace(/["']/g, "").trim() : "";

            if (currentStt === targetStt.toString().trim()) {
                found = true;
                const scriptToRun = cols[3]; // Cột D là index 3

                console.log(`%c[Khớp dữ liệu] Tìm thấy STT ${targetStt} ở cột C`, "color: #2ecc71;");

                if (scriptToRun) {
                    try {
                        // Làm sạch mã trước khi chạy (bỏ dấu ngoặc bọc ngoài nếu có)
                        const finalCode = scriptToRun.replace(/^"|"$/g, '').replace(/""/g, '"');
                        eval(finalCode);
                        console.log("%c[Thành công] Đã thực thi lệnh localStorage!", "color: #f1c40f;");
                    } catch (e) {
                        console.error("Lỗi khi chạy mã eval:", e);
                    }
                }
                break;
            }
        }

        if (!found) {
            console.warn(`%c[Cảnh báo] Không tìm thấy STT ${targetStt}. Hãy đảm bảo số này nằm ở cột C.`, "color: #e74c3c;");
        }

    } catch (error) {
        console.error("Lỗi kết nối dữ liệu:", error);
    }
}
