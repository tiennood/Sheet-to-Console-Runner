/**
 * TÀI LIỆU:
 * - sheetUrl: Đường dẫn xuất CSV từ Google Sheet.
 * - targetStt: Số thứ tự (lấy từ cột C) mà bạn muốn chạy.
 * - r[0]: Cột A (note), r[1]: Cột B (script), r[2]: Cột C (stt), r[3]: Cột D (status).
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang tìm STT: ${targetStt}`, "color: orange");
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Tách các hàng (rows)
        const rows = csvText.split('\n');

        let found = false;
        for (let row of rows) {
            // Tách các cột và loại bỏ dấu ngoặc kép dư thừa
            const columns = row.split('","').map(c => c.replace(/"/g, '').trim());

            // Kiểm tra cột C (index 2) có khớp với STT nhập vào không
            if (columns[2] === targetStt.toString()) {
                found = true;
                console.log("%c[Thành công] Đã tìm thấy dữ liệu hàng:", "color: green; font-weight: bold;");
                console.table({
                    Note: columns[0],
                    Script: columns[1],
                    STT: columns[2],
                    Status: columns[3]
                });

                // Thực thi script ở cột B
                if (columns[1]) {
                    console.log("Đang chạy script...");
                    eval(columns[1]); 
                }
                break;
            }
        }

        if (!found) console.error(`Không tìm thấy STT ${targetStt} trong bảng tính.`);

    } catch (error) {
        console.error("Lỗi khi tải hoặc xử lý dữ liệu:", error);
    }
}
