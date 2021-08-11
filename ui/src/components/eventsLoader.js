/*
converts events on a given directory to a list of events (with relative markdown documentation attached) into event structures
compatible with vuetify-calendar

require.context only accepts Literal parameters, so for now only './events' will be used
https://webpack.js.org/guides/dependency-management/#requirecontext
*/

export default class EventsLoader {
    constructor() {
        this.dir = "./events";
        this.markdowns = this.getMarkdownsFromDir();
        this.events = this.getYAMLFromDir();
    }

    getCalendar() {
        const calendars = this.events.map(event => {
            return event.content.calendar;
        })
        //merge into a single calendar array
        return [].concat.apply([], calendars);
    }

    //loads all .yml (YAML) files from a given directory
    getYAMLFromDir() {
        // const dir = this.dir;
        const requireContext = require.context('./events', true, /(.*)\.yml/);
        return requireContext.keys().map((fileName) => {
            const file = fileName.split(".")[1].replace("/", "");
            const yamlContent = require(`./events/${file}.yml`);
            const parsedContent = this.parseEvent(yamlContent);

            return {
                file,
                content: parsedContent,
            };
        });
    }

    //loads all .md (markdown) files from a given directory
    getMarkdownsFromDir() {
        const requireContext = require.context("./events/", true, /(.*)\.md/);
        return requireContext.keys().map((fileName) => {
            const file = fileName.split(".")[1].replace("/", "");
            const mdContent = require(`./events/${file}.md`).default;

            return {
                file,
                content: mdContent,
            };
        });
    }

    //maps the descrition filename with the content from the actual markdown file
    parseEvent(event) {
        event.calendar = event.calendar.map(item => {
            //has a description and it ends with a .md extension
            if (item.description && item.description.split(".")[2] == "md") {
                try {
                    const file = item.description.split(".")[1].replace('/', '');
                    //tries to get the content from the file named at the description
                    const descriptionContent = this.markdowns.find(markdown => {
                        return markdown.file == file
                    });
                    item.description = descriptionContent;
                } catch (error) {
                    item.description = "ERROR"
                    console.log("couldn't load markdown", error);
                }
            }
            return item;
        })
        return event;
    }
}