let completedCourses = 0;

const courses = {
    programacion: [
        { title: 'Introducción a la Programación', duration: '4 horas' },
        { title: 'Fundamentos de la Programación', duration: '5 horas' }
    ],
    medicina: [
        { title: 'Anatomía', duration: '6 horas' },
        { title: 'Biología del desarrollo', duration: '7 horas' }
    ],
    ingenieria: [
        { title: 'Mecánica', duration: '5 horas' },
        { title: 'Electrónica', duration: '6 horas' }
    ],
    derecho: [
        { title: 'Introducción al Derecho', duration: '4 horas' },
        { title: 'Derecho Constitucional', duration: '5 horas' }
    ],
    arquitectura: [
        { title: 'Historia de la Arquitectura', duration: '4 horas' },
        { title: 'Dibujo Arquitectónico', duration: '5 horas' }
    ],
    administracion: [
        { title: 'Introducción a la Administración', duration: '4 horas' },
        { title: 'Gestión de Proyectos', duration: '5 horas' }
    ],
    arte: [
        { title: 'Historia del Arte', duration: '4 horas' },
        { title: 'Técnicas de Pintura', duration: '5 horas' }
    ],
    educacion: [
        { title: 'Pedagogía General', duration: '4 horas' },
        { title: 'Didáctica', duration: '5 horas' }
    ],
    psicologia: [
        { title: 'Psicología General', duration: '4 horas' },
        { title: 'Desarrollo Humano', duration: '5 horas' }
    ],
    diseño: [
        { title: 'Diseño Gráfico', duration: '4 horas' },
        { title: 'Diseño Web', duration: '5 horas' }
    ],
    ciencias: [
        { title: 'Biología', duration: '4 horas' },
        { title: 'Química', duration: '5 horas' }
    ]
};

function changeCourses() {
    completedCourses = 0;
    document.getElementById('apply-button').disabled = true;

    const career = document.getElementById('carrera').value;
    const course1 = document.getElementById('course1');
    const course2 = document.getElementById('course2');

    course1.querySelector('h2').innerText = `Curso 1: ${courses[career][0].title}`;
    course1.querySelector('p').innerText = `Duración: ${courses[career][0].duration}`;
    course1.querySelector('.start-button').innerText = 'Iniciar Curso';
    course1.querySelector('.start-button').classList.remove('completed');
    course1.querySelector('.start-button').disabled = false;

    course2.querySelector('h2').innerText = `Curso 2: ${courses[career][1].title}`;
    course2.querySelector('p').innerText = `Duración: ${courses[career][1].duration}`;
    course2.querySelector('.start-button').innerText = 'Iniciar Curso';
    course2.querySelector('.start-button').classList.remove('completed');
    course2.querySelector('.start-button').disabled = false;
}

function startCourse(button) {
    button.innerText = 'Completado';
    button.classList.add('completed');
    button.disabled = true;

    completedCourses++;
    if (completedCourses >= 2) {
        document.getElementById('apply-button').disabled = false;
    }
}

function openApplicationForm() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
