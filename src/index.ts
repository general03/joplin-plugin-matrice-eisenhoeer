import joplin from 'api';
// https://joplinapp.org/fr/help/api/get_started/plugins
joplin.plugins.register({
	onStart: async function() {
		// eslint-disable-next-line no-console
		console.info('Plugin Matrice Eisenhower started !');

		async function generateMatrice() {
			console.info('Plugin Matrice Eisenhower : generating Matrice !');
			// Get tag id from name
			const tags_note = await joplin.data.get(['tags']);
			let tag_id_matrice_eisenhower = "";
			console.info("Tags list", tags_note)

			for (const tag of tags_note.items){
				if (tag.title == "matrice_eisenhower") {
					tag_id_matrice_eisenhower = tag.id;
					// break; // Comment because I got duplicate tag name, I do not know why ? 
				}
			}

			// Get all notes from tag id
			const note = await joplin.data.get(['tags', tag_id_matrice_eisenhower, 'notes'], { fields: ['id', 'title', 'body', 'parent_id']});
			console.info("Notes list", note);

			for (const todo of note.items){
				// Create Eisenhower note page
				let currentDate = new Date().toJSON().slice(0, 10);
				await joplin.data.post(['notes'], 0, { title: `Matrice Eisenhower - ${currentDate} : ${todo.title}`, body: organizeTask(todo), parent_id: todo.parent_id});
			}
		}

		function organizeTask(note){
			const extract_data = extractTodo(note.body)
			return templatePage(...buildPage(extract_data))
		}

		function buildPage(data){
			let markdownUrgentImportant=""
			let markdownImportant=""
			let markdownUrgent=""
			let markdownOther=""

			for (const item of data) {
				const dataItem = `- [ ] ${item.value} \r\n`

				if (new Date(item.date-15*24*60*60*1000) < new Date()){
					if (item.important){
						markdownUrgentImportant += dataItem
					} else {
						markdownUrgent += dataItem
					}
				}
				else {
					if (item.important){
						markdownImportant += dataItem
					} else {
						markdownOther += dataItem
					}
				}
			}
			return [markdownUrgentImportant, markdownUrgent, markdownImportant, markdownOther]

		}

		function templatePage(urgentImportantContent="", urgentContent="", importantContent="", uselessContent=""){
			const urgent_important =  `# **🔴 URGENT ET IMPORTANT** \r\n *A faire tout de suite par moi* \r\n`
			const urgent =  `# **🟠 URGENT** et PAS IMPORTANT \r\n *Déléguer* \r\n`
			const important =  `# 🟡 PAS URGENT et **IMPORTANT** \r\n *Plannifier* \r\n`
			const useless =  `# PAS URGENT et PAS IMPORTANT \r\n *Utile ?* \r\n`

			return urgent_important+ urgentImportantContent + urgent + urgentContent + important + importantContent + useless + uselessContent
		}

		function extractTodo(noteBody:string) {
			const extract_data = [];
			
			const lines = noteBody.split('\n');
			for (const line of lines) {
				// Check box markdown
				const match = line.match(/^.*(\[\s\])\s(.*)*/);
				if (!match) continue;

				// Check the date
				const dueDate = line.match(/^.*\@([0-9\/]*)/);
				let dateReturned 
				if (dueDate){
					let day_month = dueDate[1].split('/')

					if(day_month) dateReturned = new Date(new Date().getFullYear(), parseInt(day_month[1])-1, parseInt(day_month[0]))
				}

				//Check tag important
				const important = line.match(/^.*(#important).*/);

				extract_data.push({
					"value": match[2],
					"date": dateReturned,
					"important": (important ? true : false)
				}
				);
			}
			return extract_data;
		}

		console.info('Call function generateMatrice() !');
		await generateMatrice();
	},
});
