const width = 928 * 1.5;
const height = 600 * 1.5;
const offsetX = -142;
const offsetY = -80;
let currentZoom = 1;
const squareSize = 60; // Taille des carrés

// Créez un élément audio
const audio = new Audio('../../images/Benoit_Brouillet/musique.mp3'); // Remplacez 'audio.mp3' par le chemin vers votre fichier audio

d3.json("Benoit_Brouillet.json").then(treeData => {
    const root = d3.hierarchy(treeData);
    const links = root.links();
    const nodes = root.descendants();

    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;")
        .call(zoom);

    const g = svg.append("g");

    // Liens entre les nœuds
    g.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    // Noeuds avec carrés et images
    const nodeGroup = g.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(nodes)
      .join("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    // Remplace les cercles par des carrés
    nodeGroup.append("rect")
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("x", -squareSize / 2) // Centrer le carré
        .attr("y", -squareSize / 2)
        .attr("fill", d => d.children ? null : "#fff")
        .attr("stroke", d => d.children ? null : "#000")
        .on("click", clicked)
        .on("dblclick", dblclicked) // Gérer la redirection sur double-clic
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Images dans les carrés
    nodeGroup.append("image")
        .attr("xlink:href", d => d.data.photo || "default-image.jpg") // Utilise le chemin de l'image dans le JSON
        .attr("x", -squareSize / 2) // Centrer l'image
        .attr("y", -squareSize / 2)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .on("click", clicked)
        .on("dblclick", dblclicked) // Gérer la redirection sur double-clic pour l'image
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Tooltip
    nodeGroup.append("title").text(d => d.data.name);

    // Simulation de force
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.data.name).distance(80).strength(1))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", () => {
            g.selectAll("line")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            nodeGroup.attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

    // Fonction de zoom
    function zoomed(event) {
        g.attr("transform", event.transform);
    }

    // Fonction de clic pour zoomer ou dézoomer
    function clicked(event, d) {
        event.stopPropagation();

        // Vérifiez si le nom de la node est "Play"
        if (d.data.name === "Play") {
            if (!audio.paused) {
                audio.pause(); // Met en pause la musique si elle joue
            } else {
                audio.play(); // Joue la musique si elle est en pause
            }
            return; // Ne pas zoomer sur cette node
        }

        const [x, y] = d3.pointer(event, svg.node());
        const transform = d3.zoomTransform(svg.node());
        const cx = transform.invertX(x) - offsetX;
        const cy = transform.invertY(y) - offsetY;

        const zoomTo = currentZoom === 1
            ? d3.zoomIdentity.translate(width / 2, height / 2).scale(5).translate(-cx, -cy)
            : d3.zoomIdentity;

        svg.transition().duration(750).call(zoom.transform, zoomTo);

        currentZoom = currentZoom === 1 ? 5 : 1;
    }


    // Fonction de double-clic pour la redirection
    function dblclicked(event, d) {
        if (d.data.link) {
            window.location.href = d.data.link; // Redirige vers le lien s'il existe
        }
    }

    // Fonction de drag
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = null;
        d.fy = null;
    }
}).catch(error => {
    console.error("Erreur lors du chargement des données : ", error);
});
