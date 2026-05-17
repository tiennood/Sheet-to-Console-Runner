// Hàm lấy dữ liệu từ Google Sheet (định dạng CSV)
async function runProject(stt, sheetCsvUrl) {
    try {
        const response = await fetch(sheetCsvUrl);
        const data = await response.text();
        
        // Chuyển đổi CSV thành mảng
        const rows = data.split('\n').map(row => row.split(','));
        
        // Tìm hàng có STT khớp (Giả sử STT ở cột 0, Nội dung ở cột 1)
        const targetRow = rows.find(r => r[0].trim() === stt.toString());
        
        if (targetRow) {
            const codeToExecute = targetRow[1].replace(/"/g, '').trim();
            console.log(`%c Đang chạy STT ${stt}: ${codeToExecute}`, "color: blue; font-weight: bold;");
            
            // Thực thi nội dung lấy được
            eval(codeToExecute); 
        } else {
            console.error("Không tìm thấy số thứ tự này trong Sheets!");
        }
    } catch (error) {
        console.error("Lỗi khi kết nối dữ liệu:", error);
    }
}
