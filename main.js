/**
 * Hàm tách cột CSV thông minh
 * Giúp xử lý các cột chứa dấu phẩy bên trong ngoặc kép
 */
function robustCSVParser(line) {
    const result = [];
    let curVal = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            // Xử lý dấu ngoặc kép đôi bên trong chuỗi ("")
            curVal += '"';
            i++; 
        } else if (char === '"') {
            // Đảo ngược trạng thái nằm trong/ngoài ngoặc kép
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            // Chỉ tách cột khi gặp dấu phẩy nằm NGOÀI ngoặc kép
            result.push(curVal.trim());
            curVal = "";
        } else {
            curVal += char;
        }
    }
    result.push(curVal.trim());
    return result;
}

/**
 * Hàm chính tìm kiếm STT và chạy mã
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang quét tìm STT: ${targetStt}`, "color: #3498db; font-weight: bold;");
        
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const rows = csvText.split(/\r?\n/);

        let found = false;

        for (let row of rows) {
            if (!row.trim()) continue;

            // Sử dụng bộ tách cột thông minh
            const cols = robustCSVParser(row);

            // Cột C nằm ở index 2
            // Loại bỏ tất cả dấu ngoặc kép còn sót lại để so sánh số
            const currentStt = cols[2] ? cols[2].replace(/"/g, "").trim() : "";

            if (currentStt === targetStt.toString().trim()) {
                found = true;
                // Mã thực thi nằm ở Cột D (index 3)
                let scriptToRun = cols[3];

                if (scriptToRun) {
                    // Làm sạch mã: bỏ dấu bọc ngoài và đổi "" thành "
                    const cleanCode = scriptToRun.replace(/^"|"$/g, '').replace(/""/g, '"');
                    
                    console.log(`%c[Thành công] Đã tìm thấy STT ${targetStt}`, "color: #2ecc71; font-weight: bold;");
                    try {
                        eval(cleanCode);
                        console.log("%c[Hệ thống] Đã thực thi lệnh localStorage!", "color: #f1c40f;");
                    } catch (e) {
                        console.error("Lỗi thực thi mã:", e);
                    }
                }
                break;
            }
        }

        if (!found) {
            console.warn(`%c[Lỗi] Không tìm thấy STT ${targetStt} trong danh sách!`, "color: #e74c3c; font-weight: bold;");
        }

    } catch (error) {
        console.error("Lỗi tải dữ liệu từ Sheets:", error);
    }
}
