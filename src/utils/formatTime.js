var options = {year: 'numeric', month: 'long', day: 'numeric' };

export default function formatTime(date) {
    return new Date(date).toLocaleDateString("en-US", options)
}