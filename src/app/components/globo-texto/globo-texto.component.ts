import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-globo-texto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './globo-texto.component.html',
  styleUrls: ['./globo-texto.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class GloboTextoComponent implements OnInit {
  imagenesInput:string[]=[];
  imagenesGlobo:string[]=[];
  globoTexto:string='';
  swiperConfig = {
    slidesPerView: 1,
    navigation: {
      enabled:true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination:true

  };

  ngOnInit() {
    register(); 
  }

  onImagenesSeleccionadas(event: any) {
    const files: File[] = event.target.files;
    if (files) {
      Array.from(files).forEach((file:File) => {
        this.agregarImagen(file);
      });
    }
  }

  onGloboSeleccionado(event: any) {
    this.imagenesGlobo = [];
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.globoTexto = e.target?.result as string;
        this.imagenesInput.forEach((img, index) => {
          this.agregarGloboImagen(img, index);
        });
      };
      reader.readAsDataURL(file);
    }
  }

  private agregarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagenInput = e.target?.result as string;
      this.imagenesInput.push(imagenInput);
      const index = this.imagenesInput.length - 1;
      this.agregarGloboImagen(imagenInput, index);
    };
    reader.readAsDataURL(file);
  }

  private agregarGloboImagen(imagen: string, index: number) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imagenOriginal = new Image();
    const globo = new Image();
    imagenOriginal.onload = () => {
        globo.onload = () => {
            // Obtención de medidas
            const proporcionGlobo = globo.width / globo.height;
            const anchoGlobo = imagenOriginal.width;
            const altoGlobo = anchoGlobo / proporcionGlobo;
            // Medidas del canvas
            canvas.width = imagenOriginal.width;
            canvas.height = imagenOriginal.height + altoGlobo;
            // Dibujo del globo de texto
            ctx?.drawImage(globo, 0, 0, anchoGlobo, altoGlobo);
            // Dibujo de la imagen original
            ctx?.drawImage(imagenOriginal, 0, altoGlobo);
            this.imagenesGlobo.push(canvas.toDataURL('image/png'));
        };
        globo.src = this.globoTexto;
    };
    imagenOriginal.src = imagen;
}


descargarImagenes() {
  this.imagenesGlobo.forEach((imagen, index) => {
    const link = document.createElement('a');
    link.href = imagen;
    link.download = `globoTexto-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {}, 100 * index);
  });
}

limpiarImagenes() {
  const inputImagenes = document.getElementById('imagenes') as HTMLInputElement;
  inputImagenes.value = '';
  this.imagenesGlobo = [];
  this.imagenesInput = [];
}


 






}