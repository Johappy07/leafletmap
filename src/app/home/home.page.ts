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

    const stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="http://stamen.com">Stamen Design</a> &copy; <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Menambahkan base layers ke kontrol
    const baseMaps = {
      "OSM": osmLayer,
      "CartoDB Positron": cartoDBLayer,
      "Stamen Terrain": stamenLayer,
    };

    // Menambahkan layer control
    L.control.layers(baseMaps).addTo(this.map);

    // Menambahkan layer OSM sebagai default
    osmLayer.addTo(this.map);

    // Ganti dengan URL gambar marker yang sesuai
    const customIconUrl = 'URL_GAMBAR_YANG_DAPAT_DI_AKSES'; // Ganti dengan URL gambar langsung
    const customIcon = L.icon({
      iconUrl: customIconUrl,
      iconSize: [25, 41], // Sesuaikan ukuran
      iconAnchor: [12, 41]
    });

    // Menambahkan marker di Yogyakarta
    const marker = L.marker([-7.7956, 110.3695], { icon: customIcon }).addTo(this.map);

    // Menambahkan pop-up pada marker
    marker.bindPopup('Daerah Istimewa Yogyakarta');
  }
}
