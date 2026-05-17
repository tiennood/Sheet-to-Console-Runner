/**
 * Hàm lấy dữ liệu và thực thi dựa trên STT
 * @param {string} targetId - Số thứ tự nhập từ Console
 */
async function fetchAndRun(targetId) {
    // ID của Google Sheet bạn đã cung cấp
    const sheetId = "1u9lQT4e0AA5SAALuzT9-4AgA3G6V9WZeFvHXleRsXaI";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    try {
        console.log(`%c[Đang tải dữ liệu cho ID: ${targetId}]`, "color: #3498db; font-weight: bold;");
        
        const response = await fetch(csvUrl);
        const text = await response.text();

        // Tách các hàng từ file CSV
        const rows = text.split('\n');
        let found = false;

        for (let row of rows) {
            // Tách các cột. Google Sheet CSV dùng dấu "," để phân tách
            const cols = row.split('","').map(c => c.replace(/"/g, '').trim());

            // cols[2] tương ứng với cột C (Số thứ tự)
            if (cols[2] === targetId.toString()) {
                found = true;
                const scriptToRun = cols[1]; // Cột B (Mã script)

                console.log(`%c[Thành công] Tìm thấy dữ liệu tại cột C: ${cols[2]}`, "color: #2ecc71;");
                
                if (scriptToRun) {
                    console.log("Đang thực thi mã từ cột B...");
                    eval(scriptToRun);
                } else {
                    console.warn("Ô script (cột B) đang trống!");
                }
                break;
            }
        }

        if (!found) {
            console.error(`Không tìm thấy STT "${targetId}" trong bảng tính.`);
        }

    } catch (error) {
        console.error("Lỗi khi kết nối với Google Sheets:", error);
    }
}
