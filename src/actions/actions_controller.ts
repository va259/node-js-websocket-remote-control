import robot from 'robotjs';
import { drawCircle, drawSquare, drawRectangle } from './drawing';
import { printScreen } from './print_screen';

export const handle = async (command: string[]) => {
  const {x, y}: {x: number, y: number} = robot.getMousePos();
  const action: string = command[0];
  const length: number = parseInt(command[1]);
  console.log(command.toString());

  switch (action) {
    case 'mouse_position':
      return `mouse_position ${x},${y}\0`;
    case 'mouse_up':
      robot.moveMouse(x, y - length);
      return action;
    case 'mouse_down':
      robot.moveMouse(x, y + length);
      return action;
    case 'mouse_left':
      robot.moveMouse(x - length, y);
      return action;
    case 'mouse_right':
      robot.moveMouse(x + length, y);
      return action;
    case 'draw_circle':
      drawCircle(length);
      return action;
    case 'draw_rectangle':
      const width: number = parseInt(command[2]);
      drawRectangle(length, width);
      return action;
    case 'draw_square':
      drawSquare(length);
      return action;
    case 'prnt_scrn':
      const base64 = await printScreen();
      return `prnt_scrn ${base64}\0`;
  }
};
