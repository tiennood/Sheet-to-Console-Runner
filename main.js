/**
 * TÀI LIỆU:
 * - cols[2]: Số thứ tự (Cột C)
 * - cols[3]: Đoạn mã localStorage cần chạy (Cột D)
 */
async function fetchAndRun(targetStt) {
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Hệ thống] Đang tìm kiếm STT: ${targetStt}`, "color: #00dbde; font-weight: bold;");
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Tách các hàng
        const rows = csvText.split('\n');
        let found = false;

        for (let row of rows) {
            /** 
             * Xử lý đặc biệt cho CSV của Google: 
             * Dữ liệu thường được bọc bởi " và phân cách bởi ,
             */
            const cols = row.split('","').map(c => c.replace(/^"|"$/g, '').trim());

            // Kiểm tra cột C (Index 2)
            if (cols[2] === targetStt.toString()) {
                found = true;
                
                // Lấy mã thực thi từ cột D (Index 3)
                const scriptToRun = cols[3]; 

                if (scriptToRun) {
                    console.log(`%c[Khớp STT ${targetStt}]`, "color: #2ecc71; font-weight: bold;");
                    console.log("Đang thực thi lệnh cài đặt localStorage...");
                    
                    // Chạy mã: localStorage.setItem...
                    try {
                        eval(scriptToRun);
                        console.log("%c[Thành công] localStorage đã được cập nhật!", "color: #f1c40f;");
                    } catch (e) {
                        console.error("Lỗi khi thực thi mã từ Sheet:", e);
                    }
                } else {
                    console.warn("Tìm thấy STT nhưng cột D không có dữ liệu.");
                }
                break;
            }
        }

        if (!found) {
            console.error(`Không tìm thấy STT "${targetStt}" trong bảng tính. Vui lòng kiểm tra lại cột C.`);
        }
    } catch (error) {
        console.error("Lỗi kết nối dữ liệu:", error);
    }
}
