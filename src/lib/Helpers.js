// Get last array item
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// Save value to state by key
export const sbk = (key, value, log=false) => {
  if(log) {console.log(`Set ${key}:${value}`)};
  this.setState({ [key]: value });
}

export const pathType = () => window.location.pathname.split('/').last();
