document.getElementById('runBtn').addEventListener('click', async () => {
  const valueToStore = document.getElementById('dataInput').value;

  // Lấy tab hiện tại đang mở
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Thực thi script trực tiếp trên tab đó
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (val) => {
      // Thay đổi 'MY_KEY' thành tên cột bạn muốn lưu trong localStorage
      localStorage.setItem('LATEST_DATA', val);
      console.log("Đã lưu dữ liệu mới vào localStorage: " + val);
      alert("Đã lưu: " + val);
    },
    args: [valueToStore] // Truyền giá trị từ ô input vào hàm
  });
});
