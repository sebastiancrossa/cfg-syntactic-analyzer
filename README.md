# Visualizing Regex Replacer

Visualizer (barely) for replacing instances of an expression inside of a string. Project mainly done for my Computational Mathematics class, but I'm looking into adding more to it.

Currently only handles:

- Concatenation: ab
- Union: a+b
- Kleene star: ab\*

I'm planning to add more regex indicators once the core algorithm is finalized.

Valid expressions would include:

- a\*
- ab\*
- abc* + bb* + ca

## How to run / Cómo correr

```bash
git clone git@github.com:sebastiancrossa/visualizing-regex.git
cd visualizing-regex/
npm i && npm run dev
```

## Using Docker

Building the Docker image based on the Docker file. We're going to call this image `visalizing-regex-client`, but any name can be used.

```bash
cd visualizing-regex/
docker build -t visuailizing-regex-client .
```

Once the image is build, we can go ahead and run the container, binding a given port to the project port, which is 3000. In our case we're binding port 4040.

```bash
docker run --name REGEX_CLIENT_CONTAINER -p 0.0.0.0:4040:3000 visuailizing-regex-client
```

Now our project will be live on `http://localhost:4040`.

### Notes on the regex engine algorithm

The core part of this project, which is the regex engine, is not nearly as good as it can potentially be. The code is messy and has MANY spots where it can bleed or not work properly, which is why I consider this project to be in its alpha stages.

### Notes on the future of the project

There are a lot of things I'd love to implement and build for this project. Some of these ideas include:

- Clean up and organize the code
  - At its current stage it's barely unreadable, so I'll soon be sitting down and clean the messy logic and spaghetti code.
- Implement regex replacer algorithm with a Finite Automata.
  - This is what I'm actually learning in my computational mathematics class, so it'll be fun working on that and coding up that implementation.
- Stay true to the name of the project and actually have some visualization aspect that illustrates each step the algorithm takes to find and replace occurrences of a string based on the defined pattern.
