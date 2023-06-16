import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';

@Component({
  selector: 'app-escape-game-one',
  templateUrl: './escape-game-one.component.html',
  styleUrls: ['./escape-game-one.component.scss']
})
export class EscapeGameOneComponent implements OnInit {
  private stage?: Stage;

  public ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'konvajs-container',
      width: 500,
      height: 500,
    });

    this.addImage(`./assets/cards/Agnes Martin (1).png`);
    this.addImage(`./assets/cards/Agnes Martin (2).png`);
  }

  private drawImage(imageObj: any): void {
    var layer = new Konva.Layer();
    // darth vader
    var darthVaderImg = new Konva.Image({
      image: imageObj,
      x: this.stage!.width() / 2 - 200 / 2,
      y: this.stage!.height() / 2 - 137 / 2,
      width: 200,
      height: 137,
      draggable: true,
    });

    // add cursor styling
    darthVaderImg.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    darthVaderImg.on('mouseout', function () {
      document.body.style.cursor = 'default';
    });

    layer.add(darthVaderImg);
    this.stage!.add(layer);
  }

  private addImage(imagePath: string) {
    var imageObj = new Image();
    const context = this;
    imageObj.onload = function() {
      context.drawImage(this);
    }
    imageObj.src = imagePath;
  }
}
