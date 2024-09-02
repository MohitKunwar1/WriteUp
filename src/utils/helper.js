export const readTime = (desc) => {
    const averageReadTime = 225;
    
const div = document.createElement('div');
div.innerHTML = desc.__html;

const textContent = div.textContent || div.innerHTML;

const words = textContent.trim().split(/\s+/);

return Math.ceil(words.length /averageReadTime);

}

export const formatNumber = (num) => {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + "B";
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
      } else {
        return num.toString();
      }
}