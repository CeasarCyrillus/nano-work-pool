## nano-work-pool

This was an experiment with integrating with [nano nodes](https://docs.nano.org/integration-guides/#public-apis)

For every transaction on the nano chain, there's a small proof-of-work required.
This project is aimed to create a public marketplace for consumers and suppliers of work to connect

### The good
I liked trying out my [mf-ts library](https://github.com/CeasarCyrillus/mf-ts) more, and discovered a lot of mistakes I made with it, since this was the first time I actually used it for a "real" project,
so in this codebase I was rewriting it, [here](api/src/mf-ts) 

See [RPCService](api/src/domain/services/RPCService.ts) and the `generateWork` function for a real life use case