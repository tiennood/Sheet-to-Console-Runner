/**
 * Hàm thực thi chính: Tìm dữ liệu theo STT và chạy script
 * @param {string} targetStt - STT người dùng nhập (Cột C)
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang kiểm tra dữ liệu cho STT: ${targetStt}`, "color: #3498db");
        const response = await fetch(csvUrl);
        const data = await response.text();

        // Tách hàng và cột từ CSV
        const rows = data.split('\n');
        let found = false;

        for (let row of rows) {
            // Tách các cột dựa trên dấu phẩy và loại bỏ dấu ngoặc kép dư thừa
            const cols = row.split('","').map(c => c.replace(/"/g, '').trim());

            // Kiểm tra cột C (index 2)
            if (cols[2] === targetStt.toString()) {
                found = true;
                const codeToRun = cols[1]; // Lấy script từ cột B

                console.log(`%c[Thành công] Tìm thấy hàng cho STT ${targetStt}`, "color: #2ecc71");
                
                if (codeToRun) {
                    console.log("Đang thực thi mã...");
                    eval(codeToRun);
                } else {
                    console.warn("Ô script ở cột B đang trống.");
                }
                break;
            }
        }

        if (!found) console.error(`Không tìm thấy STT ${targetStt} ở cột C.`);
    } catch (err) {
        console.error("Lỗi khi kết nối Google Sheets:", err);
    }
}
