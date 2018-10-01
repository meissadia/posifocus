let Colors = {
  blue: new Color(0, 150, 255, 0.9),
  green: new Color(62, 187, 154, 0.9),
  clear: new Color(0, 0, 0, 0),
  shade20: new Color(0, 0, 0, .2),
  shade10: new Color(0, 0, 0, .1),
  gratitudes: new Color(0, 150, 235, .5),
  priorities: new Color(18, 152, 226),
  relationships: new Color(26, 158, 217),
  todays: new Color(34, 163, 200),
  projects: new Color(18, 134, 205),
  contacts: new Color(23, 136, 193),
  tasks: new Color(15, 120, 189),
  settings: new Color(46, 171, 174),
}

Colors.blue_green = `linear-gradient(${Colors.blue.str()}, ${Colors.green.str()})`;

export default Colors;

export function Color(r=0, g=0, b=0, a=0) {
  this.rgba = { r, g, b, a };

  this.darken = (amount) => {
    let new_color = {};
    Object.keys(this.rgba).forEach((key) => (
      new_color[key] = Math.round(Math.max(this.rgba[key] - amount, 50)))
    )
    return new Color(new_color.r, new_color.g, new_color.b, a);
  }

  this.pct = (pct) => {
    let new_color = {};
    Object.keys(this.rgba).forEach((key) => (
      new_color[key] = Math.round((1 - pct) * this.rgba[key])
      )
    )
    return new Color(new_color.r, new_color.g, new_color.b, a);
  }

  this.lighten = (amount) => {
    let new_color = {};
    Object.keys(this.rgba).forEach((key) => (
      new_color[key] = Math.round(Math.min(this.rgba[key] - amount, 255)))
    )
    return new Color(new_color.r, new_color.g, new_color.b, a);
  }

  this.alpha = (value) => {
    return new Color(r, g, b, value);
  }

  this.toString = () => this.asString(this.rgba);
  this.str = () => this.toString();

  this.asString = (color) => (
    `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  )
}
