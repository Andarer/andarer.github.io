async function loadPortal() {

    const registryResponse =
        await fetch("./data/registry.json");

    const categoriesResponse =
        await fetch("./data/categories.json");

    const registry =
        await registryResponse.json();

    const categories =
        await categoriesResponse.json();

    renderPortal(
        registry.projects,
        categories
    );

}

function renderPortal(projects, categories) {

    const grid =
        document.getElementById("projects-grid");

    grid.innerHTML = "";

    const orderedCategories =
        Object.entries(categories)
        .sort((a,b)=>
            a[1].order - b[1].order
        );

    orderedCategories.forEach(([name, category]) => {

        const categoryProjects =
            projects.filter(
                p => p.category === name
            );

        if(categoryProjects.length === 0)
            return;

        const section =
            document.createElement("div");

        section.className =
            "category-section";

        section.innerHTML = `
            <h2 class="category-title">
                ${category.icon}
                ${name}
            </h2>
        `;

        const cards =
            document.createElement("div");

        cards.className =
            "grid";

        categoryProjects.forEach(project => {

            const card =
                document.createElement("div");

            card.className =
                "card";

            card.innerHTML = `
                <h3>
                    ${project.icon}
                    ${project.title}
                </h3>

                <span
                class="badge"
                style="
                background:${category.color}">
                ${name}
                </span>

                <p>
                ${project.description}
                </p>

                <div class="card-details">

                    <p>
                    ${project.status}
                    </p>

                    <div class="buttons">

                        <a
                        href="${project.github}"
                        target="_blank">
                        GitHub
                        </a>

                        ${
                            project.website
                            ?
                            `
                            <a
                            href="${project.website}"
                            target="_blank">
                            Website
                            </a>
                            `
                            :
                            ""
                        }

                    </div>

                </div>
            `;

            card.addEventListener(
                "click",
                (e) => {

                    if(
                        e.target.tagName
                        === "A"
                    )
                    return;

                    card.classList.toggle(
                        "expanded"
                    );

                }
            );

            cards.appendChild(card);

        });

        section.appendChild(cards);

        grid.appendChild(section);

    });

}

loadPortal();