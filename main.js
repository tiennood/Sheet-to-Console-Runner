/**
 * Hàm xử lý dữ liệu CSV phức tạp từ Google Sheets
 * @param {string} targetStt - Số thứ tự cần tìm (Cột C)
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang phân tích dữ liệu cho STT: ${targetStt}`, "color: #3498db; font-weight: bold;");
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // Tách các hàng (Rows)
        const rows = csvText.split('\n');
        let found = false;

        for (let row of rows) {
            /**
             * BIỂU THỨC CHÍNH QUY (Regex):
             * Tách các cột dựa trên dấu phẩy nằm ngoài dấu ngoặc kép.
             * Giúp bảo vệ dữ liệu JSON bên trong cột A.
             */
            const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            
            if (!cols || cols.length < 4) continue;

            // Làm sạch dữ liệu: bỏ dấu ngoặc bọc ngoài và đổi "" thành "
            const cleanCols = cols.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));

            // Kiểm tra STT tại Cột C (Index 2)
            if (cleanCols[2] === targetStt.toString()) {
                found = true;
                const finalScript = cleanCols[3]; // Lấy mã tại Cột D (Index 3)

                console.log(`%c[Khớp dữ liệu] STT: ${targetStt}`, "color: #2ecc71; font-weight: bold;");
                
                if (finalScript) {
                    console.log("Đang thực thi mã vào Console...");
                    // Thực thi lệnh localStorage.setItem
                    try {
                        eval(finalScript);
                        console.log("%c[Thành công] localStorage đã được nạp!", "color: #f1c40f;");
                    } catch (e) {
                        console.error("Lỗi thực thi mã script:", e);
                    }
                }
                break;
            }
        }

        if (!found) {
            console.error(`Không tìm thấy STT "${targetStt}" trong danh sách.`);
        }

    } catch (error) {
        console.error("Lỗi kết nối hoặc xử lý CSV:", error);
    }
}
