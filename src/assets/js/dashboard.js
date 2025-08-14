import ApexCharts from "apexcharts";
document.addEventListener("DOMContentLoaded", () => {
    fetch(`${window.location.origin}/data/data.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // ✅ Update Stats
            document.getElementById("totalUsers").textContent = data.stats.totalUsers;
            document.getElementById("totalSales").textContent = data.stats.totalSales;
            document.getElementById("ordersPending").textContent = data.stats.ordersPending;
            document.getElementById("revenue").textContent = `$${data.stats.revenue}`;

            // ✅ Render Recent Orders
            const ordersTable = document.getElementById("recentOrdersTableBody");
            ordersTable.innerHTML = "";
            data.recentOrders.forEach(order => {
                ordersTable.insertAdjacentHTML(
                    "beforeend",
                    `<tr>
                        <td>${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.product}</td>
                        <td><span class="badge bg-${
                            order.status === "Completed"
                                ? "success"
                                : order.status === "Pending"
                                ? "warning"
                                : "danger"
                        }">${order.status}</span></td>
                    </tr>`
                );
            });

            // ✅ ApexCharts for Monthly Sales
            var options = {
                chart: {
                    type: "area",
                    height: 350,
                    toolbar: { show: false },
                    zoom: { enabled: false }
                },
                colors: ["#4f46e5"],
                dataLabels: { enabled: false },
                stroke: { curve: "smooth", width: 3 },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.4,
                        opacityTo: 0.1,
                        stops: [0, 90, 100]
                    }
                },
                series: [
                    {
                        name: "Monthly Sales",
                        data: data.monthlySales
                    }
                ],
                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    labels: { style: { colors: "#6b7280" } }
                },
                yaxis: {
                    labels: { style: { colors: "#6b7280" } }
                },
                tooltip: {
                    theme: "dark",
                    y: {
                        formatter: function (val) {
                            return "$" + val;
                        }
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector("#dashboardChart"), options);
            chart.render();
        })
        .catch(err => console.error("Error loading dashboard data:", err));
});
