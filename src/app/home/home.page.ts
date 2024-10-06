import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Inisialisasi peta dengan ID elemen HTML
    this.map = L.map('mapId').setView([-7.7956, 110.3695], 13); // Koordinat Yogyakarta

    // Base layer
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    });

    const esriWorldImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    });

    // Menambahkan base layers ke kontrol
    const baseMaps = {
      "OSM": osmLayer,
      "CartoDB Positron": cartoDBLayer,
      "Esri World Imagery": esriWorldImageryLayer,
    };

    // Menambahkan layer control
    L.control.layers(baseMaps).addTo(this.map);

    // Menambahkan layer OSM sebagai default
    osmLayer.addTo(this.map);

    // Ganti dengan URL gambar marker yang sesuai
    const customIconUrl = 'assets/icon/icon_marker.png'; // Assuming marker.png is in the assets/icon directory
    const customIcon = L.icon({
      iconUrl: customIconUrl,
      iconSize: [50, 50], // Sesuaikan dengan ukuran asli gambar
      iconAnchor: [25, 50] // Sesuaikan titik jangkar agar sesuai dengan kebutuhan Anda
    });

    // Menambahkan marker di Yogyakarta
    const marker = L.marker([-7.7956, 110.3695], { icon: customIcon }).addTo(this.map);

    // Menambahkan pop-up pada marker
    marker.bindPopup('Daerah Istimewa Yogyakarta');
  }
}
