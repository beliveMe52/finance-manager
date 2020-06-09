export default function(date) {
   const options = {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
   }
   return new Intl.DateTimeFormat('ru-Ru', options).format(date)
   
}