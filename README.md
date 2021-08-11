# poc-community-event

## Editing locally

```
/ui/src/components/events
```


### Event Template
```yml
name: "Currais Py"
calendar:
  - name: Workshop GOLang
    description: ./workshop-flask.md #a markdown on the same dir ./events
    author: lucascassiano #github username
    start: 2021-10-11 09:00
    end: 2021-10-11 10:00

  - name: Palestra WebSockets
    description: ./mossoro-py-ago-2021.md
    author: lucascassiano
    start: 2021-10-11 11:15
    end: 2021-10-11 12:15

  - name: Palestra Cassiano
    description: ./mossoro-py-ago-2021.md 
    author: lucascassiano
    start: 2021-10-11 12:30
    end: 2021-10-11 13:15
```


## Running
```sh
cd ui
yarn install
yarn serve
#open http://localhost:8080
```

