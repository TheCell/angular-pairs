import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';

@Component({
  selector: 'app-escape-game-two',
  templateUrl: './escape-game-two.component.html',
  styleUrls: ['./escape-game-two.component.scss']
})
export class EscapeGameTwoComponent implements OnInit {
  public ngOnInit(): void {
    const stage = new Konva.Stage({
      container: 'konvajs-container',
      width: 500,
      height: 500,
    });

    var layer = new Konva.Layer();
    var rectX = stage.width() / 2 - 50;
    var rectY = stage.height() / 2 - 25;

    layer.add(this.addBox('#118ab2', rectX, rectY));
    layer.add(this.addBox('#06d6a0', rectX + 20, rectY + 20));
    layer.add(this.addBox('#073b4c', rectX - 20, rectY - 20));
    stage.add(layer);
  }

  private addBox(color: string, rectX: number, rectY: number) : Rect {
    var box = new Konva.Rect({
      x: rectX,
      y: rectY,
      width: 100,
      height: 50,
      fill: color,
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
    });

    // add cursor styling
    box.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function () {
      document.body.style.cursor = 'default';
    });

    return box;
  }
}
