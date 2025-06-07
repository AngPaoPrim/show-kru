function SaveData() {
    const name = document.getElementById("name");
    var data = {
        name: document.getElementById("name").value,
    }
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert("Data saved successfully!");
            GetData();
            name.value = ""; // Clear input field after saving
            setTimeout(() => {
                ClearOutPut();
            }, 3000); // Clear data after 5 seconds
        } else {
            alert("Error saving data.");
        }
    });
}

function GetData() {
    fetch('/get')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var output = document.getElementById("output");
        output.innerHTML = "";
        data.forEach(item => {
            var p = document.createElement("p");
            p.textContent = item.name;
            output.appendChild(p);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function ClearData() {
    fetch('/clear', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            alert("Data cleared successfully!");
            GetData();
        } else {
            alert("Error clearing data.");
        }
    });
}

function ClearOutPut() {
    var output = document.getElementById("output");
    output.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    GetData(); // Load data when the page is ready
});