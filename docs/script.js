document.addEventListener("DOMContentLoaded", () => {
    const noticeForm = document.getElementById("noticeForm");
    const noticeTitle = document.getElementById("noticeTitle");
    const noticeDesc = document.getElementById("noticeDesc");
    const noticeList = document.getElementById("noticeList");
    const searchInput = document.getElementById("searchInput");
    const courseList = document.getElementById("courseList");

    // Load saved notices from browser LocalStorage
    let notices = JSON.parse(localStorage.getItem("departmentNotices")) || [];

    function renderNotices() {
        noticeList.innerHTML = "";
        if (notices.length === 0) {
            noticeList.innerHTML = "<p style='margin-top:1rem;'>No notices posted yet.</p>";
            return;
        }

        notices.forEach((notice, index) => {
            const div = document.createElement("div");
            div.className = "notice-item";
            div.innerHTML = `
                <h4>${notice.title}</h4>
                <p>${notice.description}</p>
                <button onclick="deleteNotice(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.85rem;">Delete</button>
            `;
            noticeList.appendChild(div);
        });
    }

    // Add new notice dynamically
    noticeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newNotice = {
            title: noticeTitle.value,
            description: noticeDesc.value
        };

        notices.unshift(newNotice); // Add to the beginning of the array
        localStorage.setItem("departmentNotices", JSON.stringify(notices));

        noticeTitle.value = "";
        noticeDesc.value = "";
        renderNotices();
    });

    // Make delete function globally available
    window.deleteNotice = function(index) {
        notices.splice(index, 1);
        localStorage.setItem("departmentNotices", JSON.stringify(notices));
        renderNotices();
    };

    // Dynamic Course Search Filter
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const items = courseList.getElementsByTagName("li");

        Array.from(items).forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Initial render call
    renderNotices();
});