import ApexCharts from "apexcharts";
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard chart script loaded");

    fetch('/data/data.json')
        .then(res => res.json())
        .then(data => {
            console.log("Fetched dashboard data:", data);

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
        .catch(err => console.error("Error loading chart data:", err));
});
