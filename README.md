![Preview](https://github.com/MGSimard/emerald/blob/master/public/metadata/twitter-image.png?raw=true)

# [Emerald](https://emerald-app.pages.dev/)

Emerald est une application de suivi local-first, optimisée pour gérer le progrès des Avis de recherche sur Dofus.

<table>
<thead>
<tr><th><h2>Tech Stack</h2></th></tr>
</thead>

<tr><td>

| Tech             | Version | Info                    | Documentation                                             |
| ---------------- | ------- | ----------------------- | --------------------------------------------------------- |
| React            | 19.0.0  | Compiler Enabled        | [react.dev](https://react.dev/)                           |
| Vite             | 6.2.0   | Build Tool & Dev Server | [vite.dev](https://vite.dev/)                             |
| TanStack Router  | 1.112.0 | Routing                 | [tanstack.com/router](https://tanstack.com/router/latest) |
| TypeScript       | 5.8.2   | Type Safety             | [typescriptlang.org](https://www.typescriptlang.org/)     |
| Dexie.js         | 4.0.11  | IndexedDB Wrapper       | [dexie.org](https://dexie.org)                            |
| ESLint           | 9.21.0  | Flat Config             | [eslint.org](https://eslint.org/)                         |
| Node             | 23.8.0  | Runtime Environment     | [nodejs.org](https://nodejs.org/)                         |
| pnpm             | 10.4.2  | Package Manager         | [pnpm.io](https://pnpm.io/)                               |
| Cloudflare Pages | -       | Hosting                 | [pages.cloudflare.com](https://pages.cloudflare.com/)     |
| Sonner           | 2.0.1   | UI Notifications        | [sonner.emilkowal.ski](https://sonner.emilkowal.ski/)     |

</td></tr> </table>

---

## Contact

MGSimard  
X: [@MGSimard](https://x.com/MGSimard)  
GitHub: [@MGSimard](https://github.com/MGSimard)  
Mail: [mgsimard.dev@gmail.com](mailto:mgsimard.dev@gmail.com)

For more info, view my portfolio at [mgsimard.dev](https://mgsimard.dev).

---

## Task List

- [ ] Consider adding a toggle for ACCEPTED QUEST, so you know whether or not you picked up that bounty quest
- [ ] Consider webp for images, sucks for users wanting to download resources so not sure about that, site is lightweight enough that it doesn't matter
- [ ] There's a world where the only thing in localDB is IDs + user tracked data, that way I could simplify multi-language setup by matching localDB ID with the mob data JSON for rendering, rather than syncing the totality of the JSON into the localDB. It's not that big of a deal but if for some god forsaken reason I decide to support more than two languages, the localDB would start looking like shit with every single language version of monster names, locations etc.
