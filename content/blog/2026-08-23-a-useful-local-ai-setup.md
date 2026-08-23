---
title: A Useful Local AI Setup Is Mostly Software
date: 2026-08-23
summary: Practical tools, patterns, and project ideas for running local models without turning the whole exercise into a GPU shopping contest.
tags: Local AI, Agents, Ollama, Docker
featured: true
---

Local AI conversations have a habit of becoming hardware conversations. How much VRAM? Which GPU? How many tokens per second?

Those questions matter, but they are not where most of the learning happens. A modest machine running a small model can teach you far more than an expensive build that only serves a chat window. The useful part is the software around the model: how you expose it, connect tools, route work, preserve context, and make it available where you actually build.

My setup is intentionally practical. A Linux workstation and a small cluster run jobs. A MacBook is often the control plane. Tailscale and SSH provide private remote access. Docker Compose keeps services reproducible. Ollama handles local inference, with model files sourced through Hugging Face when I want something beyond the defaults.

The hardware changes. That operating pattern does not.

## Start with a boring runtime

[Ollama](https://ollama.com/) is a good default because it removes enough friction to let you focus on the application. Pull a model, expose a local API, and treat inference like another service.

```bash
ollama pull qwen2.5-coder:7b
ollama run qwen2.5-coder:7b
```

The exact model is less important than choosing one that fits comfortably. A smaller model that responds reliably is more useful for development than a larger model that constantly spills into system memory or stalls the machine.

A few practical rules:

- Start smaller than you think you need.
- Use task-specific models when possible, especially for code or embeddings.
- Keep model names and runtime settings in environment variables rather than scattering them through projects.
- Test the same prompt against two or three models before deciding the application is the problem.
- Measure whether the output is useful, not whether the token counter looks impressive.

## Put a private network in front of it

The best upgrade to a local AI setup is often not another GPU. It is making the compute you already own safely available from the machine you prefer to use.

Tailscale makes this straightforward. The workstation and compute nodes join a private network, and the laptop reaches them by stable name or private address. SSH handles administration and remote jobs. Internal APIs can bind to the Tailscale interface instead of being exposed to the public internet.

```bash
ssh ai-node
curl http://ai-node:11434/api/tags
```

That creates a clean separation:

- The laptop remains the interface and development environment.
- The Linux machines provide persistent services and longer-running compute.
- Nothing needs an open router port.
- The same endpoint works from home or away.

Use SSH keys, disable password login where practical, and do not expose Ollama or an experimental agent directly to the internet. A local model is not automatically a secure model.

## Containerize everything except the model experiment

I use Docker Compose for the services around inference: interfaces, APIs, databases, queues, and agent experiments. Compose is not glamorous, which is precisely why it works well here. The configuration is readable, portable, and easy to tear down.

```yaml
services:
  assistant-api:
    build: ./api
    environment:
      OLLAMA_BASE_URL: http://host.docker.internal:11434
      MODEL_NAME: qwen2.5-coder:7b
    ports:
      - "8000:8000"
```

Keep the first iteration simple. Run Ollama directly on the host when GPU access is easier there, and containerize the application layer. Once the workflow is stable, decide whether moving inference into a container actually improves anything.

## Build tools, not another empty chat box

A chat interface is useful for checking whether a model runs. It is not much of a project.

The interesting work starts when the model can take constrained action. A few projects that produce real learning:

### A repository assistant

Give an agent read-only tools for listing files, searching code, and opening relevant sections. Require it to cite the files it used. This teaches context selection, tool design, and how quickly unconstrained agents wander.

### A job runner

Let a lightweight API submit a long-running task to a remote node, report status, and return the resulting artifact to the workstation. The model can help define or interpret the job, but normal software should own execution state.

### A personal research index

Index a small, deliberate collection of notes or documents. Add source citations before adding more data. Retrieval quality is easier to understand when you know the corpus well.

### A model router

Send coding prompts to a code model, short classification tasks to a small fast model, and difficult synthesis to a hosted provider. Local and hosted AI are complements. Routing work intentionally is usually better than forcing one model to do everything.

### A scheduled analyst

Have a job collect public data, calculate deterministic metrics, and ask the model to summarize what changed. Keep collection and calculation outside the model. Use the model for interpretation and communication.

## Keep deterministic work deterministic

This is the most important agent lesson: do not ask a model to recreate business logic that should be code.

Calculations, permission checks, database writes, and recurring transformations belong in normal functions with tests. Expose those functions as narrow tools. Let the model decide when to call them and how to explain the result.

That pattern makes even a modest local model more useful because it does less guessing. It also makes switching models much easier. The durable asset is the tool layer, not the current checkpoint.

## Treat prompts and tool calls like application code

Save prompts in version control. Log which tools were called and how long they took. Keep a small set of questions with known-good answers and rerun them when models or prompts change.

You do not need an elaborate evaluation platform to start. A JSON file with representative requests, expected facts, and prohibited behavior is already better than testing from memory.

Useful things to record:

- Model and quantization
- Prompt version
- Retrieved sources
- Tool calls and arguments
- Total latency
- Whether the final answer included the expected facts
- Whether the model attempted an action it was not allowed to take

## Make outputs disposable

Experiment nodes should be easy to rebuild. Keep source code in GitHub, configuration in Compose files, and important outputs on the primary workstation or backed-up storage. Do not let an experimental machine quietly become the only place a project exists.

This also reduces the fear of changing things. If a node breaks, rebuild it. If a model is not useful, replace it. If an agent design becomes tangled, throw away the orchestration and keep the tools.

## The point of a local lab

The goal is not to reproduce a hyperscaler in a spare room. It is to make infrastructure tangible.

Running local agents forces useful questions: Where does state live? What can this process access? How does another machine call it? What happens when inference stops? Which work needs a model, and which work should remain plain software?

Answering those questions on imperfect hardware is the project. The machine is just where the lesson runs.
