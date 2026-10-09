https://funet.sharepoint.com/sites/MjukvaruutvecklareYhdistans/_layouts/15/stream.aspx?id=%2Fsites%2FMjukvaruutvecklareYhdistans%2FDelade%20dokument%2FGeneral%2FRecordings%2FMeeting%20in%20General%2D20261009%5F211852%2DMeeting%20Recording%2Emp4&nav=eyJwbGF5YmFja09wdGlvbnMiOnsic3RhcnRUaW1lSW5TZWNvbmRzIjo0MTQuODI3MjU2fX0%3D&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E8c74cef6%2Daaa7%2D42cd%2Dae55%2D21824d2cbb5c

### React + Vite - TO DO app

***1. State-hantering: Hur håller din app reda på vilka uppgifter som finns och om de är klara? Vad händer med gränssnittet när datan uppdateras?***\
Denna applikation hanterar uppgifters status via `todos` (en array) state, samtidigt som den härleder en filtrerad delmängd (`filteredTodos`) baserat på ett aktivt filter (`"all"`, `"active"` eller `"completed"`). Användaråtgärder som att lägga till, växla status eller ta bort uppgifter utlöser state-uppdateringar via `setTodos`, vilket omedelbart får komponenten att ritas om (re-render). När data ändras beräknar gränssnittet omedelbart om det totala antalet uppgifter och tillämpar villkorsstyrd CSS-styling på slutförda objekt. Slutligen växlar applikationen dynamiskt mellan att iterera över listan med aktiva uppgifter och att visa ett meddelande för läget då listan är tom, beroende på om det finns matchande objekt.\
***Oföränderlighet (Immutability): Varför får man inte ändra en befintlig array direkt med t.ex. .push() i React? Hur gör du istället när du lägger till eller tar bort en uppgift?***\
I React bör tillståndet (state) betraktas som oföränderligt (immutable), eftersom React förlitar sig på ändringar i minnesreferenser för att upptäcka när data har ändrats. Om du ändrar en array direkt med `.push()` förblir arrayens minnesreferens densamma; React uppfattar därför inte att tillståndet har uppdaterats och kommer inte att rendera om gränssnittet.
Istället för att ändra den befintliga arrayen skapar du en helt ny array med det uppdaterade innehållet:

För att lägga till ett element: Använd JavaScripts spread-operator (`...`) för att kopiera befintliga element till en ny array.
`setTodos([...todos, newTodo]);`

För att ta bort ett element: Använd `.filter()`, som returnerar en ny array innehållande endast de element som uppfyller villkoret.
`setTodos(todos.filter((todo) => todo.id !== idToRemove));`

***2. Kodgranskning***
```
function addTodo(todos, text) {
  todos.push(text);
  return todos;
}
```
Koden försöker addera en uppgift med .push(), men problemet är att den ändrar direkt i befintligt state så att React inte upptäcker ändringen. Ett bättre sätt är att använda en spread-operator som skapar en helt ny array (lista):
```
function addTodo(todos, text) {
  return [...todos, text];
}
```

***3. Problemlösning - Hur gjorde du när du körde fast eller stötte på ett problem? Om du använde verktyg som AI, Google eller React-dokumentationen: ge ett konkret exempel på hur du tog hjälp för att förstå och lösa problemet själv.***\
Gemini har varit till stor hjälp för mig under det här projektet. Ibland hjälpte verktyget till att påpeka ganska enkla syntaxfel, som saknade avslutande parenteser eller ett tecken som fallit bort. Vid andra tillfällen var det till hjälp för att förklara grunderna i React; när jag till exempel skulle bryta ut komponenterna `TodoItem` och `TodoForm` var jag osäker på var jag skulle placera dem. Jag lärde mig att om komponenterna ska ligga i samma fil som huvudappen, måste de mindre komponenterna placeras antingen före eller efter – men definitivt utanför – huvudappens funktion. Om man definierar en komponent inuti en annan komponent, återskapar React komponentdefinitionen vid varje rendering, vilket leder till att tillståndet (state) återställs upprepade gånger och att prestandan försämras. Till slut bröt jag ut dessa komponenter till egna filer.
