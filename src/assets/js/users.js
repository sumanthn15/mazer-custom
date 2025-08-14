window.addEventListener("load", () => {
    console.log("Users.js loaded");

    let users = [];
    let filteredUsers = [];
    let currentPage = 1;
    const rowsPerPage = 10;

    // Elements
    const tableBody = document.getElementById("usersTableBody");
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    function renderTable(page) {
        tableBody.innerHTML = "";

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageUsers = filteredUsers.slice(start, end);

        pageUsers.forEach(user => {
            const row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.joinDate}</td>
                <td><span class="badge bg-${user.status === "Active" ? "success" : "secondary"}">${user.status}</span></td>
            </tr>`;
            tableBody.insertAdjacentHTML("beforeend", row);
        });

        // Update pagination info
        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredUsers.length / rowsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(filteredUsers.length / rowsPerPage);
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        filteredUsers = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
            const matchesStatus = status === "All" || user.status === status;
            return matchesSearch && matchesStatus;
        });

        currentPage = 1;
        renderTable(currentPage);
    }

    // Event listeners
    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    nextPageBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(filteredUsers.length / rowsPerPage)) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    searchInput.addEventListener("input", applyFilters);
    statusFilter.addEventListener("change", applyFilters);

    // Fetch data
    fetch(`${window.location.origin}/data/data.json`)
        .then(r => r.json())
        .then(data => {
            console.log("Fetched users:", data.users);
            users = data.users;
            filteredUsers = [...users];
            renderTable(currentPage);
        })
        .catch(err => console.error("Error loading users:", err));
});
