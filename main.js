/**
 * TÀI LIỆU:
 * - targetId: STT nhập từ Console.
 * - cols[1]: Nội dung mã script cần chạy (Cột B).
 * - cols[2]: Số thứ tự để lọc (Cột C).
 */
async function fetchAndRun(targetId) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang kiểm tra STT: ${targetId}`, "color: #3498db");
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // Tách dữ liệu thành các hàng
        const rows = csvText.split('\n');
        let found = false;

        for (let row of rows) {
            // Tách cột và loại bỏ dấu ngoặc kép dư thừa từ Google CSV
            const cols = row.split('","').map(c => c.replace(/"/g, '').trim());

            // So khớp với cột C (index 2)
            if (cols[2] === targetId.toString()) {
                found = true;
                console.log(`%c[Thành công] Đã tìm thấy hàng cho STT: ${targetId}`, "color: #2ecc71");
                
                const scriptToExecute = cols[1]; // Lấy mã ở cột B
                if (scriptToExecute) {
                    console.log("Đang thực thi mã...");
                    eval(scriptToExecute); 
                } else {
                    console.warn("Ô nội dung ở cột B đang trống.");
                }
                break;
            }
        }

        if (!found) {
            console.error(`Không tìm thấy STT "${targetId}" trong bảng tính.`);
        }
    } catch (error) {
        console.error("Lỗi khi kết nối dữ liệu Google Sheets:", error);
    }
}
