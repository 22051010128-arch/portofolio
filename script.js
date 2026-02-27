// Menunggu sampai seluruh file HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

// Fungsi asinkron untuk mengambil data dari JSON
async function loadProjects() {
    try {
        // Mengambil data dari file lokal JSON
        const response = await fetch('projects.json');
        
        // Memastikan fetch berhasil
        if (!response.ok) {
            throw new Error('Gagal memuat data proyek');
        }

        // Mengubah respon menjadi bentuk objek JavaScript (Array)
        const projects = await response.json();
        
        // Memanggil fungsi untuk menampilkan data ke layar
        renderProjects(projects);
        
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        document.getElementById('projects-container').innerHTML = 
            "<p>Maaf, tidak dapat memuat proyek saat ini.</p>";
    }
}

// Fungsi untuk menyusun data JSON menjadi elemen HTML
function renderProjects(projectsData) {
    const container = document.getElementById('projects-container');
    
    // Looping melalui setiap proyek dalam array
    projectsData.forEach(project => {
        // Membuat elemen div pembungkus (kartu)
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Memasukkan template HTML ke dalam kartu menggunakan string literal
        projectCard.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.thumbnail_url}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.category} &bull; ${project.year}</p>
            </div>
        `;
        
        // Memasukkan kartu yang sudah jadi ke dalam container di index.html
        container.appendChild(projectCard);
    });
}
