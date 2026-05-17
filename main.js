/**
 * Hàm lấy dữ liệu từ Google Sheet dựa trên STT ở cột C
 * @param {string} sttInput - Số thứ tự người dùng nhập vào
 */
async function fetchAndRun(sttInput) {
    // Đường dẫn CSV từ Google Sheet của bạn
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI/gviz/tq?tqx=out:csv";

    try {
        console.log("...Đang kết nối dữ liệu...");
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Chia dữ liệu thành các hàng và cột
        const rows = csvText.split('\n').map(row => {
            // Xử lý dấu ngoặc kép và chia cột bằng dấu phẩy
            return row.split('","').map(cell => cell.replace(/"/g, ''));
        });

        // Tìm hàng có cột C (index số 2) khớp với STT nhập vào
        const targetRow = rows.find(r => r[2] && r[2].trim() === sttInput.toString().trim());

        if (targetRow) {
            const data = {
                note: targetRow[0],   // Cột A
                script: targetRow[1], // Cột B
                stt: targetRow[2],    // Cột C
                status: targetRow[3]  // Cột D
            };

            console.log("%c ĐÃ TÌM THẤY DỮ LIỆU:", "color: green; font-weight: bold;");
            console.table(data);

            // Ví dụ: Thực thi mã script từ cột B
            if (data.script) {
                console.log("Đang thực thi script...");
                eval(data.script);
            }
        } else {
            console.error("Không tìm thấy dữ liệu cho STT: " + sttInput);
        }
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
    }
}
