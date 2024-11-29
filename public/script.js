document.getElementById("livroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value; // Changed to get the value as a string
    const ano = document.getElementById("ano").value;

    try {
        const response = await fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, autor, ano }),
        });

        if (!response.ok) {
            throw new Error("Failed to add the book");
        }

        fetchlivros();
        fetchTotallivros();
    } catch (error) {
        console.error(error);
    }
});

async function fetchlivros() {
    try {
        const res = await fetch("http://localhost:3000/livros");
        if (!res.ok) {
            throw new Error("Failed to fetch books");
        }

        const livros = await res.json();
        const list = document.getElementById("livrosList");
        list.innerHTML = "";
        livros.forEach((livro) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${livro.titulo} - ${livro.autor} - ${livro.ano}
                <button class="edit" data-id="${livro._id}" data-description="${livro.description}" data-amount="${livro.amount}" data-date="${livro.date}">Edit</button>
                <button class="delete" data-id="${livro._id}">Delete</button>
            `;
            list.appendChild(li);
        });

        document.querySelectorAll(".delete").forEach((button) => {
            button.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                await deleteLivro(id);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteLivro(id) {
    try {
        const response = await fetch(`http://localhost:3000/livros/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete the book");
        }

        fetchlivros();
        fetchTotallivros();
    } catch (error) {
        console.error(error);
    }
}

fetchlivros();
fetchTotallivros();