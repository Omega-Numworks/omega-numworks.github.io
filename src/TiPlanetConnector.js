
import profile from './pages/omega-ide/src/img/profile.png'

/**
 * Local storage connector class. Dummy connector for dev.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class TiPlanetConnector {
    static __instance = null;
    static __allowed_chars_file = "abcdefghijklmnopqrstuvwxyz1234567890_";
    static __init_file_content = "from math import *\n";
    
    static __init_projects = decodeURIComponent(escape(window.atob("eyJMYWJ5IjpbeyJuYW1lIjoicG9seWNhbGMucHkiLCJjb250ZW50IjoiZGVmIGNvbDNfMl9yZ2IoYywgYml0cywgYmdyKTpcbiAgcmV0dXJuIGNbMipiZ3JdLy8yKiooOCAtIGJpdHNbMF0pICsgY1sxXS8vMioqKDggLSBiaXRzWzFdKSoyKipiaXRzWzBdICsgY1syKihub3QgYmdyKV0vLzIqKig4LWJpdHNbMl0pKjIqKihiaXRzWzBdICsgYml0c1sxXSlcbmRlZiBrYzE2X2RyYXdfbGluZSh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gIGRyYXdfbGluZShpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpLCBjb2wzXzJfcmdiKGMsIFs1LCA2LCA1XSwgMSkpXG5cbmRlZiBnZXRfaW5mb3MoKTpcbiAgZ2xvYmFsIGtjMTZfZHJhd19saW5lXG4gIGZub3AgPSBsYW1iZGEgOiBOb25lXG4gIHNjcmVlbl93LCBzY3JlZW5faCwgY29sb3JfYml0cywgcG9seV9zZXRfcGl4ZWwsIHBvbHlfZHJhd19saW5lLCBwb2x5X2ZpbGxfcmVjdCwgcG9seV9jbGVhbl9zY3JlZW4sIG5lZWRfY2xlYW4sIG5lZWRfbGluZSwgbmVlZF9yZWN0ID0gMCwgMjIyLCBbNSwgNiwgNV0sIGZub3AsIGZub3AsIGZub3AsIGZub3AsIDAsIDEsIDFcbiAgdHJ5OlxuICAgIGlmIGNocigyNTYpPT1jaHIoMCk6ICMgS2hpQ0FTIFB5dGhvbiBjb21wYXQuXG4gICAgICBuZWVkX2xpbmUgPSAwXG4gICAgICBuZWVkX2NsZWFuID0gMVxuICAgICAgc2NyZWVuX3cgPSAzMjBcbiAgICAgIGRlZiBwb2x5X3NldF9waXhlbCh4LCB5LCBjKTpcbiAgICAgICAgc2V0X3BpeGVsKHgsIHksIGNvbDNfMl9yZ2IoYywgWzUsNiw1XSwgMCkpXG4gICAgICBwb2x5X2RyYXdfbGluZSA9IGtjMTZfZHJhd19saW5lXG4gIGV4Y2VwdDpcbiAgICBwYXNzXG4gIGlmIG5vdCBzY3JlZW5fdzpcbiAgICBrYzE2X2RyYXdfbGluZSA9IE5vbmVcbiAgICB0cnk6ICMgS2hpQ0FTIE1pY3JvcHl0aG9uXG4gICAgICBpbXBvcnQgZ3JhcGhpY1xuICAgICAgZGVmIHBvbHlfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgICAgICAgZ3JhcGhpYy5kcmF3X2xpbmUoaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKSwgY29sM18yX3JnYihjLCBjb2xvcl9iaXRzLCAxKSlcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gICAgICAgIGdyYXBoaWMuZHJhd19maWxsZWRfcmVjdGFuZ2xlKGludCh4MSksIGludCh5MSksIGludCh4MiksIGludCh5MiksIGMpXG4gICAgICBzY3JlZW5fdywgcG9seV9zZXRfcGl4ZWwsIG5lZWRfY2xlYW4sIG5lZWRfbGluZSwgbmVlZF9yZWN0ID0gMzIwLCBncmFwaGljLnNldF9waXhlbCwgMSwgMCwgMFxuICAgIGV4Y2VwdDpcbiAgICAgIHBhc3NcbiAgaWYgbm90IHNjcmVlbl93OlxuICAgIHRyeTogIyBOdW1Xb3Jrc1xuICAgICAgaW1wb3J0IGthbmRpbnNreVxuICAgICAgc2NyZWVuX3csIHBvbHlfc2V0X3BpeGVsLCBuZWVkX3JlY3QgPSAzMjAsIGthbmRpbnNreS5zZXRfcGl4ZWwsIDBcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgICAga2FuZGluc2t5LmZpbGxfcmVjdChpbnQoeCksIGludCh5KSwgaW50KHcpLCBpbnQoaCksIGMpXG4gICAgZXhjZXB0OlxuICAgICAgcGFzc1xuXG4gIGlmIG5lZWRfbGluZTpcbiAgICBkZWYgcG9seV9kcmF3X2xpbmUoeDEsIHkxLCB4MiwgeTIsIGMpOlxuICAgICAgbSwgYTEsIGIxLCBhMiwgYjIgPSAwLCBpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpXG4gICAgICBpZiAoeDIgLSB4MSkgKiogMiA8ICh5MiAtIHkxKSAqKiAyOlxuICAgICAgICBtLCBhMSwgYTIsIGIxLCBiMiA9IDEsIGIxLCBiMiwgYTEsIGEyXG4gICAgICBpZiBtaW4oYTEsIGEyKSAhPSBhMTogYTEsIGIxLCBhMiwgYjIgPSBhMiwgYjIsIGExLCBiMVxuICAgICAgZm9yIGsgaW4gcmFuZ2UoYTIgLSBhMSArIDEpOlxuICAgICAgICBhLCBiID0gYTEgKyBrLCBpbnQoYjEgKyAoYjIgLSBiMSkgKiBrIC8gKChhMiAtIGExKSBvciAxKSlcbiAgICAgICAgcG9seV9zZXRfcGl4ZWwoKGEsIGIpW21dLCAoYiwgYSlbbV0sIGMpXG5cbiAgaWYgbmVlZF9yZWN0OlxuICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgIGZvciBrIGluIHJhbmdlKGgpOlxuICAgICAgICBwb2x5X2RyYXdfbGluZSh4LCB5ICsgaywgeCArIHcgLSAxLCB5ICsgaywgYylcblxuICBpZiBuZWVkX2NsZWFuOlxuICAgIGRlZiBwb2x5X2NsZWFuX3NjcmVlbigpOlxuICAgICAgcG9seV9maWxsX3JlY3QoMCwgMCwgc2NyZWVuX3csIHNjcmVlbl9oLCBbMjU1LCAyNTUsIDI1NV0pXG4gIHJldHVybiBzY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBmbm9wXG4ifSx7Im5hbWUiOiJsYWJ5LnB5IiwiY29udGVudCI6IiNjYXNcbmZyb20gbWF0aCBpbXBvcnQgc2luLCBjb3MsIGFzaW4sIHBpXG5mcm9tIHBvbHljYWxjIGltcG9ydCAqXG5cbmRlZiByaShhLGIpOlxuICBnbG9iYWwgc1xuICBzID0gKHMgKiAyMTQwMTMgKyAyNTMxMDExKSAlIDQyOTQ5NjcyOTZcbiAgciA9IChzIC8vIDY1NTM2KSAmIDB4N2ZmZlxuICByZXR1cm4gciAlIChiLWEpICsgYVxuXG5kZWYgbW9uX3NlY3JldCh2LCBiLCBuKTpcbiAgcmV0dXJuIHYgJiB+KGIgKiAyKipuKVxuXG5kZWYgbW9uX3hvcihhLCBiKTpcbiAgcmV0dXJuIGEgKyBiIC0gKGEgJiBiKVxuXG5kZWYgZml4X2FuZ2xlKGEpOlxuICByZXR1cm4gYSAqIDIgKiBhc2luKDEpIC8gcGlcblxuZGVmIHVmbChyKTpcbiAgZ2xvYmFsIHJsXG4gIGksIHMgPSByIC8vIDMsIDEwICogKHIgJSAzKVxuICByZXAgPSBybFtpXS8vMioqcyAmIDEwMjNcbiAgaWYgcmVwICE9IHI6XG4gICAgcmVwID0gdWZsKHJlcClcbiAgICBybFtpXSA9IG1vbl9zZWNyZXQocmxbaV0sIDEwMjMsIHMpXG4gICAgcyA9IHJlcCAqIDIqKnNcbiAgICBybFtpXSA9IG1vbl94b3IocmxbaV0sIHMpXG4gIHJldHVybiByZXBcblxuZGVmIHVmbShyMSwgcjIpOlxuICBnbG9iYWwgcmxcbiAgaSwgcjEgPSByMSAvLyAzLCAxMCAqIChyMSAlIDMpXG4gIHIyICo9IDIqKnIxXG4gIHJsW2ldID0gbW9uX3NlY3JldChybFtpXSwgMTAyMywgcjEpXG4gIHJsW2ldID0gbW9uX3hvcihybFtpXSwgcjIpXG5cbmRlZiBjb3V0KHgpOlxuICByZXR1cm4gbGVuKHN0cihyb3VuZChhYnMoeCkvMS4sNSkpKVxuXG5kZWYgYV9nYXVjaGUoYSk6XG4gIGdsb2JhbCBzdGF0ZVxuICBzdGF0ZVs3XSArPSBhXG4gIHN0YXRlWzVdICs9IDUgKyBjb3V0KGEpXG4gIHN0YXRlWzJdIC09IGFcblxuZGVmIGFfZHJvaXRlKGEpOlxuICBzdGF0ZVs3XSArPSAyICogYVxuICBhX2dhdWNoZSgtYSlcblxuZGVmIGF2YW5jZXIobCk6XG4gIGdsb2JhbCBzdGF0ZVxuICB0ID0gZml4X2FuZ2xlKHN0YXRlWzJdKVxuICBkeCwgZHkgPSBjb3ModCksIHNpbih0KVxuICBzdGF0ZVs3XSArPSBsXG4gIHN0YXRlWzVdICs9IDggKyBjb3V0KGwpXG4gIHdoaWxlKGwgPiAwKTpcbiAgICBzdGF0ZVszOjVdID0gc3RhdGVbMDoyXVxuICAgIHgsIHkgPSBzdGF0ZVswXSArIGR4LzQsIHN0YXRlWzFdICsgZHkvNFxuICAgIGl4LCBpeSA9IGludCh4KSAtICh4IDwgMCksIGludCh5KSAtICh5IDwgMClcbiAgICBkcngsIGRyeSA9IGl4IC0gaW50KHN0YXRlWzNdKSwgaXkgLSBpbnQoc3RhdGVbNF0pXG4gICAgdncgPSBsYW1iZGEgeSwgeDogd2xbeV0gJiAyKip4XG4gICAgaHcgPSBsYW1iZGEgeSwgeDogd2xbeSArIGxhYnlfaF0gJiAyKip4XG4gICAgd3ggPSBsYWJ5X3cgLSAyIC0gbWluKGl4LCBpeCAtIGRyeClcbiAgICB0eCA9IGRyeCBhbmQgKGl4IDwgMCBvciBpeCA+PSBsYWJ5X3cgb3IgdncoaXkgLSBkcnksIGxhYnlfdyAtIDIgLSBtaW4oaXgsIGl4IC0gZHJ4KSkpXG4gICAgdHkgPSBkcnkgYW5kIChpeSA8IDAgb3IgaXkgPj0gbGFieV9oIG9yIGh3KG1pbihpeSwgaXkgLSBkcnkpLCBsYWJ5X3cgLSAxIC0gKGl4IC0gZHJ4KSkpXG4gICAgdCA9IGR4IDw9IDAgb3IgaW50KHgpIDwgbGFieV93IC0gMSBvciBpbnQoeSkgPCBsYWJ5X2ggLSAxXG4gICAgaWYgdCBhbmQgdHggb3IgdHkgb3IgKGRyeCBhbmQgZHJ5IGFuZCAodCBhbmQgdHggb3IgdHkpKSBvciAoZHJ4IGFuZCBkcnkgYW5kICh0IGFuZCB2dyhpeSwgbGFieV93IC0gMiAtIG1pbihpeCwgaXggLSBkcngpKSBvciBodyhtaW4oaXksIGl5IC0gZHJ5KSwgbGFieV93IC0gMSAtIGl4KSkpOlxuICAgICAgc3RhdGVbNV0gKz0gMTVcbiAgICAgIHJldHVyblxuICAgIGwgLT0gLjI1XG4gICAgc3RhdGVbNl0gKz0gKHN0YXRlWzZdIDwgMjAwKVxuICAgIHN0YXRlWzA6Ml0gPSAoeCwgeSlcbiAgICBwb2x5X2RyYXdfbGluZShzdGF0ZVszXSAqIHp4LCBzdGF0ZVs0XSAqIHp5LCBzdGF0ZVswXSAqIHp4LCBzdGF0ZVsxXSAqIHp5LCBjb2xvcnNbNF0pXG5cbmxhYnlfdywgbGFieV9oID0gMjAsIDEyXG5zID0gMHhkZWFkYmVlZlxuXG5ybCA9IFsoMyppICsgMikqMTA0ODU3NiArICgzKmkgKyAxKSoxMDI0ICsgMyppIGZvciBpIGluIHJhbmdlKChsYWJ5X3cqbGFieV9oICsgMikgLy8gMyldXG53bCA9IFsoMioqKGxhYnlfdyArIDEpIC0gMSkgLy8gKDEgKyAoayA8IGxhYnlfaCkpIGZvciBrIGluIHJhbmdlKDIqbGFieV9oIC0gMSldXG5jbCA9IGxhYnlfdyAqIGxhYnlfaFxud2hpbGUgY2wgPiAxIC0gKGxhYnlfdyAqIGxhYnlfaCkvLzEwMCoxMDpcbiAgeSA9IHJpKDAsIDIqbGFieV9oIC0gMSlcbiAgeCA9IHJpKDAsIGxhYnlfdyAtICh5IDwgbGFieV9oKSlcbiAgaWYgd2xbeV0gJiAyKip4OlxuICAgIGlmIHkgPCBsYWJ5X2g6XG4gICAgICByMSA9IHkqbGFieV93ICsgeFxuICAgICAgcjIgPSByMSArIDFcbiAgICBlbHNlOlxuICAgICAgcjEgPSAoeSAtIGxhYnlfaCkqbGFieV93ICsgeFxuICAgICAgcjIgPSByMSArIGxhYnlfd1xuICAgIHJsMSwgcmwyID0gdWZsKHIxKSwgdWZsKHIyKVxuICAgIGlmIHJsMSAhPSBybDIgb3IgY2wgPD0gMTpcbiAgICAgIHVmbShybDEsIHJsMilcbiAgICAgIGNsIC09IDFcbiAgICAgIHdsW3ldID0gbW9uX3NlY3JldCh3bFt5XSwgMSwgeClcbmZvciByIGluIHJhbmdlKGxhYnlfdyAqIGxhYnlfaCk6XG4gIHVmbChyKVxuXG5zY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBwb2x5X3Nob3dfc2NyZWVuID0gZ2V0X2luZm9zKClcbmRzID0gNFxuemludCA9IDEgKyAoc2NyZWVuX3cgPiAyKmxhYnlfdypkcylcbmRzICs9IHppbnQgLSAxXG56eCwgenkgPSAoc2NyZWVuX3cgLSB6aW50KSAvIGxhYnlfdywgKHNjcmVlbl9oIC0gemludCkgLyBsYWJ5X2hcbmdldF9pbmZvcywgcG9seV9zZXRfcGl4ZWwsIHJsLCB1ZmwsIHVmbSA9IE5vbmUsIE5vbmUsIE5vbmUsIE5vbmUsIE5vbmVcbmNvbG9ycyA9IChbMCwgOTUsIDBdLCBbMCwgMCwgNjNdLCBbMCwgMTI3LCAwXSwgWzAsIDAsIDc5XSwgWzI1NSwgMCwgMF0pXG5cbmRlZiBhbGxlcl9zZWxvbihmKTpcbiAgZ2xvYmFsIHN0YXRlXG4gIHN0YXRlID0gWzAsIC41LCAwLCAwLCAuNSwgMCwgMCwgMF1cbiAgcG9seV9jbGVhbl9zY3JlZW4oKVxuICBmb3IgaSBpbiByYW5nZSgyKTpcbiAgICBwb2x5X2ZpbGxfcmVjdCgwLCBpICogbGFieV9oICogenksIGxhYnlfdyAqIHp4LCB6aW50LCBjb2xvcnNbMV0pXG4gICAgcG9seV9maWxsX3JlY3QoaSAqIGxhYnlfdyAqIHp4LCAobm90IGkpICogenksIHppbnQsIChsYWJ5X2ggLSAxKSAqIHp5LCBjb2xvcnNbMF0pXG4gIGZvciB5IGluIHJhbmdlKDIqbGFieV9oIC0gMSk6XG4gICAgZm9yIHogaW4gcmFuZ2UobGFieV93IC0gKHkgPCBsYWJ5X2gpKTpcbiAgICAgIGlmIHdsW3ldICYgMioqejpcbiAgICAgICAgeCA9IGxhYnlfdyAtIDEgLSB6XG4gICAgICAgIGlmIHkgPCBsYWJ5X2g6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCB5ICogenksIHppbnQsIHp5LCBjb2xvcnNbMl0pXG4gICAgICAgIGVsc2U6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCAoeSAtIGxhYnlfaCArIDEpICogenksIHp4LCB6aW50LCBjb2xvcnNbM10pXG4gIGYoKVxuICBwb2x5X3Nob3dfc2NyZWVuKClcbiAgc3RhdGVbNV0gKz0gc2luKGZpeF9hbmdsZShzdGF0ZVs3XSkpIC0gc3RhdGVbNl0gLy8gMlxuICBwcmludCgnQ29uc29tbWF0aW9uIDogJyArIHN0cihzdGF0ZVs1XSkpXG4gIGlmIHN0YXRlWzBdID49IGxhYnlfdzpcbiAgICBwcmludCgnQnJhdm8sIHR1IGVzIHNvcnRpLWUuJylcbiAgICBwcmludCgnUG91ciBqb3VlciBldCBnYWduZXIsJylcbiAgICBwcmludCgnZW52b2llIHRvbiBzY3JpcHQgYScpXG4gICAgcHJpbnQoJ2luZm9AdGlwbGFuZXQub3JnLicpXG4gIHJldHVybiBzdGF0ZVs1XVxuIn0seyJuYW1lIjoibGFieXRlc3QucHkiLCJjb250ZW50IjoiI2Nhc1xuZnJvbSBsYWJ5IGltcG9ydCAqXG5cbmRlZiBjaGVtaW4oKTpcbiAgYXZhbmNlcigxLjUpXG4gIGFfZHJvaXRlKDEuNTcwNzk2MzI2Nzk0ODk2NilcbiAgYXZhbmNlcigxKVxuIn1dLCJDQVZFIjpbeyJuYW1lIjoiY2F2ZS5weSIsImNvbnRlbnQiOiIjY2FzXG5mcm9tIG1hdGggaW1wb3J0IHBpLCBzaW4sIGNvcywgc3FydFxuZnJvbSBwb2x5Y2FsMiBpbXBvcnQgKlxuXG5kZWYgcm5kKCk6XG4gIGdsb2JhbCBzXG4gIHJuZF9tYXggPSAweDdmZmZcbiAgcyA9IChzICogMjE0MDEzICsgMjUzMTAxMSkgJSA0Mjk0OTY3Mjk2XG4gIHJldHVybiAoKHMgLy8gKDIqcm5kX21heCArIDEpKSAmIHJuZF9tYXgpIC8gcm5kX21heFxuXG5kZWYgaG1hcCh0KTpcbiAgZnJxLCBwaGEsIGhtLCBhbXAgPSBbIDEsIDMsIDE1LCAyMSwgMzksIDUxLCA5NywgMTQ1IF0sIFtdLCBbXSwgW11cbiAgZm9yIGkgaW4gcmFuZ2UoOCk6XG4gICAgYW1wLmFwcGVuZCgocm5kKCkgKyAxKSAqIChjYXZlX2ggKiAyNykgLyAyMDAgLyAxLjIqKmkpXG4gIGZvciBrIGluIGZycTpcbiAgICBwaGEuYXBwZW5kKHBpICogcm5kKCkpXG4gIGZvciB4IGluIHJhbmdlKGNhdmVfdyk6XG4gICAgaG0uYXBwZW5kKGludChzdW0oW2FtcFtpXSAqICgxICsgc2luKGZpeF9hbmdsZShmcnFbaV0qeC9jYXZlX3cgKyBwaGFbaV0pKSkgLyAyIGZvciBpIGluIHJhbmdlKGxlbihhbXApKV0pKSlcbiAgcmV0dXJuIFsgaCAtIG1pbihobSkgKyB0IGZvciBoIGluIGhtIF1cblxuY2F2ZV93LCBjYXZlX2gsIHMgPSAxMjgsIDY0LCAweGRlYWRiZWVmXG5mbCwgY3YgPSBobWFwKDIpLCBobWFwKDgpXG5cbnNjcmVlbl93LCBzY3JlZW5faCwgcG9seV9oYXNfY29sb3IsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfZmlsbF9lbGxpcHNlLCBwb2x5X2NsZWFuX3NjcmVlbiwgcG9seV9zaG93X3NjcmVlbiA9IGdldF9pbmZvcygpXG56eCwgenkgPSAoc2NyZWVuX3cgLSAxKSAvIChjYXZlX3cgLSAxKSwgKHNjcmVlbl9oIC0gMSkgLyAoY2F2ZV9oIC0gMSlcbmdldF9pbmZvcywgcG9seV9zZXRfcGl4ZWwsIGhtYXAsIHJuZCA9IE5vbmUsIE5vbmUsIE5vbmUsIE5vbmVcblxuZGVmIGludGVycG9sMSh5aSwgeWYsIGR4KTpcbiAgcmV0dXJuIHlpICsgZHgqKHlmIC0geWkpXG5cbmRlZiBpbnRlcnBvbF9saXN0KGxzdCwgaSk6XG4gIGkwID0gaW50KGkpXG4gIHYgPSBsc3RbaTBdXG4gIGlmIGkgPiBpMCBhbmQgaSA8IGxlbihsc3QpIC0gMTpcbiAgICB2ID0gaW50ZXJwb2wxKHYsIGxzdFtpMCArIDFdLCBpIC0gaTApXG4gIHJldHVybiB2XG5cbmRlZiB0ZXN0X2NvbGxpc2lvbih4LCB5KTpcbiAgZiA9IGNhdmVfaCAtIGludGVycG9sX2xpc3QoZmwsIHgpXG4gIHJldHVybiB5ID49IGYgb3IgeSA8PSBmLWludGVycG9sX2xpc3QoY3YsIHgpXG5cbmRlZiB0ZXN0X2NvbGxpc2lvbl9yZWN0KHgsIHksIGR4LCBkeSk6XG4gIHgxLCB4MiwgeTEsIHkyID0gbWF4KDAsIHggLSBkeCksIG1pbihjYXZlX3cgLSAxLCB4ICsgZHgpLCB5IC0gZHksIHkgKyBkeVxuICByZXR1cm4gdGVzdF9jb2xsaXNpb24oeDEsIHkxKSArIHRlc3RfY29sbGlzaW9uKHgyLCB5MSkgKyB0ZXN0X2NvbGxpc2lvbih4MSwgeTIpICsgdGVzdF9jb2xsaXNpb24oeDIsIHkyKVxuXG5kZWYgdGVzdF9iYWxsb29uKHgsIHksIHJ4LCByeSwgZF92ZXJ0KTpcbiAgcm1heCwgcjIsIGssIGNvbGxpc2lvbnMgPSBbcngsIHJ5XVtkX3ZlcnRdLCBbcnksIHJ4XVtkX3ZlcnRdLCAtMSwgMFxuICB3aGlsZSBrIDwgcm1heDpcbiAgICBrID0gbWluKGsgKyAxLCBybWF4KVxuICAgIGsyID0gc3FydChtYXgoMCwgcjIqcjIqKDEgLSBrKmsvcm1heC9ybWF4KSkpXG4gICAgY29sbGlzaW9ucyArPSB0ZXN0X2NvbGxpc2lvbl9yZWN0KHgsIHksIFtrLCBrMl1bZF92ZXJ0XSwgW2syLCBrXVtkX3ZlcnRdKVxuICByZXR1cm4gY29sbGlzaW9uc1xuXG5kZWYgcnh5KGEpOlxuICBpZiBhJTIgPT0gMTpcbiAgICByeCwgcnkgPSAwLCAxLTIqKGElNCA9PSAzKVxuICBlbHNlOlxuICAgIGEgPSBmaXhfYW5nbGUoYSAqIHBpLzIpXG4gICAgcngsIHJ5ID0gYWJzKGNvcyhhKSksIGFicyhzaW4oYSkpXG4gIHJldHVybiAxICsgYWJzKHJ4KSwgMSArIGFicyhyeSlcblxuY29sb3JzID0gKFswLCAwLCAwXSwgWzI1NSwgMjU1LCAyNTVdLCBbMCwgMCwgMjU1XSwgWzI1NSwgMCwgMF0sIFsxNTksIDE1OSwgMTU5XSlcblxuZGVmIG1vZGlmaWVyX3ZvbChheSwgZGEsIGR0KTpcbiAgZ2xvYmFsIHN0YXRlXG4gIGlmIGF5IG9yIGRhOlxuICAgIHN0YXRlWzRdICs9IDEwXG4gIHgsIHksIGEgPSBzdGF0ZVswOjNdXG4gIHdoaWxlIHN0YXRlWzBdIDwgY2F2ZV93IC0gMSBhbmQgZHQ6XG4gICAgc3RhdGVbMF0gKz0gMVxuICAgIHN0YXRlWzJdID0gbWF4KDAsIG1pbigxLCBhICsgZGEpKVxuICAgIHN0YXRlWzNdIC09IGF5XG4gICAgc3RhdGVbMV0gPSBtYXgoMCwgbWluKGNhdmVfaCAtIDEsIHN0YXRlWzFdICsgc3RhdGVbM10pKVxuICAgIGR0ID0gbWF4KDAsIGR0IC0gMSkgIFxuICAgIGRhLCBkYXBpLCBkeCA9IGFicyhzdGF0ZVsyXSAtIGEpLCBhYnMoc3RhdGVbMl0gLSAuNSksIDFcbiAgICBzdGF0ZVs0XSArPSAzKihkYSA+IDApKigxICsgZGEpICsgMiooZGFwaSA+IDApKigxICsgZGFwaSlcbiAgICB4YywgeWMsIGR4ID0geCwgeSwgMVxuICAgIHJ4LCByeSA9IHJ4eShzdGF0ZVsyXSlcbiAgICBpZiBzdGF0ZVsxXSAhPSB5OlxuICAgICAgZHggPSBtaW4oMSAvIGFicyhzdGF0ZVsxXSAtIHkpLCAxKVxuICAgIGNvbGxpc2lvbnMgPSB0ZXN0X2JhbGxvb24oc3RhdGVbMF0sIHN0YXRlWzFdLCByeCwgcnksIDApICsgdGVzdF9iYWxsb29uKHN0YXRlWzBdLCBzdGF0ZVsxXSwgcngsIHJ5LCAxKVxuICAgIGlmIGNvbGxpc2lvbnM6XG4gICAgICBzdGF0ZVs0XSArPSA3ICogKDEgKyBjb2xsaXNpb25zKVxuICAgIHdoaWxlIHhjIDwgc3RhdGVbMF06XG4gICAgICB4YyArPSBkeC96eFxuICAgICAgeWMgPSBpbnRlcnBvbDEoeSwgc3RhdGVbMV0sIHhjIC0geClcbiAgICAgIHJ4LCByeSA9IHJ4eShpbnRlcnBvbDEoYSwgc3RhdGVbMl0sIHN0YXRlWzJdIC0gYSkpXG4gICAgICBwb2x5X2ZpbGxfZWxsaXBzZSh4YyAqIHp4LCB5YyAqIHp5LCByeCAqIHp4LCByeSAqIHp5LCBjb2xvcnNbMipwb2x5X2hhc19jb2xvciArIChjb2xsaXNpb25zID4gMCldKVxuICAgIHgsIHksIGEgPSBzdGF0ZVswXSwgc3RhdGVbMV0sIHN0YXRlWzJdXG5cbmRlZiB2b2xlcl9zZWxvbihmKTpcbiAgZ2xvYmFsIHN0YXRlLCBmbCwgY3ZcbiAgc3RhdGUgPSBbMCwgMTIsIC41LCAwLDBdXG4gIHBvbHlfZmlsbF9yZWN0KDAsIDAsIHNjcmVlbl93LCBzY3JlZW5faCwgY29sb3JzWzRdKVxuICBmb3IgeCBpbiByYW5nZShjYXZlX3cpOlxuICAgIGYxLCBkeCA9IGNhdmVfaCAtIGZsW3hdLCAwXG4gICAgYzEgPSBmMSAtIGN2W3hdXG4gICAgd2hpbGUgZHggPCB6eDpcbiAgICAgIGYyID0gY2F2ZV9oIC0gaW50ZXJwb2xfbGlzdChmbCwgeCArIGR4L3p4KVxuICAgICAgYzIgPSBmMiAtIGludGVycG9sX2xpc3QoY3YsIHggKyBkeC96eClcbiAgICAgIHBvbHlfZHJhd19saW5lKHgqenggKyBkeCwgYzIgKiB6eSwgeCp6eCArIGR4LCBmMiAqIHp5LCBjb2xvcnNbMV0pXG4gICAgICBkeCArPSAxXG4gICAgaWYgcG9seV9oYXNfY29sb3I6XG4gICAgICBwb2x5X2RyYXdfbGluZSh4ICogengsIGMxICogenksICh4ICsgMSkgKiB6eCwgYzIgKiB6eSwgY29sb3JzWzBdKVxuICAgICAgcG9seV9kcmF3X2xpbmUoeCAqIHp4LCBmMSAqIHp5LCAoeCArIDEpICogengsIGYyICogenksIGNvbG9yc1swXSlcbiAgZigpXG4gIGlmIHN0YXRlWzBdIDwgY2F2ZV93IC0gMTpcbiAgICBtb2RpZmllcl92b2woMCwgMCwgY2F2ZV93IC0gMSAtIHN0YXRlWzBdKVxuICBwb2x5X3Nob3dfc2NyZWVuKClcbiAgcHJpbnQoJ0NvbnNvbW1hdGlvbiA6ICcgKyBzdHIoc3RhdGVbNF0pKVxuICBwcmludCgnQnJhdm8sIHR1IGVzIHBhc3NlLWUuJylcbiAgcHJpbnQoJ1BvdXIgam91ZXIgZXQgZ2FnbmVyLCcpXG4gIHByaW50KCdlbnZvaWUgdG9uIHNjcmlwdCBhJylcbiAgcHJpbnQoJ2luZm9AdGlwbGFuZXQub3JnLicpXG4gIHJldHVybiBzdGF0ZVs0XVxuIn0seyJuYW1lIjoiY2F2ZXRlc3QucHkiLCJjb250ZW50IjoiZnJvbSBtYXRoIGltcG9ydCAqXG4jY2FzXG5mcm9tIGNhdmUgaW1wb3J0ICpcblxuZGVmIHBsYW4oKTpcbiAgbW9kaWZpZXJfdm9sKC0xLCAwLCA1KVxuICBtb2RpZmllcl92b2woMSwgMCwgOClcbiAgbW9kaWZpZXJfdm9sKC0wLjg5LCAwLjEsIDYpXG4gIG1vZGlmaWVyX3ZvbCgwLCAwLjEsIDUpXG4gIG1vZGlmaWVyX3ZvbCgxLCAwLjEsIDgpXG5cbnZvbGVyX3NlbG9uKHBsYW4pXG4ifSx7Im5hbWUiOiJwb2x5Y2FsMi5weSIsImNvbnRlbnQiOiJmcm9tIG1hdGggaW1wb3J0ICpcbmZyb20gbWF0aCBpbXBvcnQgcGksIGFzaW4sIHNxcnRcblxuZGVmIGZpeF9hbmdsZShhKTpcbiAgcmV0dXJuIGEgKiAyICogYXNpbigxKSAvIHBpXG5cbmRlZiBjb2wzXzJfcmdiKGMsIGJpdHMsIGJncik6XG4gIHJldHVybiBjWzIqYmdyXS8vMioqKDggLSBiaXRzWzBdKSArIGNbMV0vLzIqKig4IC0gYml0c1sxXSkqMioqYml0c1swXSArIGNbMioobm90IGJncildLy8yKiooOC1iaXRzWzJdKSoyKiooYml0c1swXSArIGJpdHNbMV0pXG5kZWYga2MxNl9kcmF3X2xpbmUoeDEsIHkxLCB4MiwgeTIsIGMpOlxuICBkcmF3X2xpbmUoaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKSwgY29sM18yX3JnYihjLCBbNSwgNiwgNV0sIDEpKVxuZGVmIGtjMTZfZmlsbF9yZWN0KHgsIHksIHcsIGgsIGMpOlxuICBkcmF3X3JlY3RhbmdsZShmbG9hdCh4KSwgZmxvYXQoeSksIGZsb2F0KHcpLCBmbG9hdChoKSwgY29sM18yX3JnYihjLCBbNSwgNiwgNV0sIDEpICsgZmlsbGVkKVxuZGVmIGtjMTZfZmlsbF9lbGxpcHNlKHgsIHksIHJ4LCByeSwgYyk6XG4gIGRyYXdfYXJjKGZsb2F0KHgpLCBmbG9hdCh5KSwgZmxvYXQocngpLCBmbG9hdChyeSksIDAsIDIqcGksIGNvbDNfMl9yZ2IoYywgWzUsIDYsIDVdLCAxKSArIGZpbGxlZClcblxuZGVmIGdldF9pbmZvcygpOlxuICBnbG9iYWwga2MxNl9kcmF3X2xpbmUsIGtjMTZfZmlsbF9yZWN0LCBrYzE2X2ZpbGxfZWxsaXBzZVxuICBmbm9wID0gbGFtYmRhIDogTm9uZVxuICBzY3JlZW5fdywgc2NyZWVuX2gsIGNvbG9yX2JpdHMsIHBvbHlfaGFzX2NvbG9yLCBwb2x5X3NldF9waXhlbCwgcG9seV9zaG93LCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfZmlsbF9lbGxpcHNlLCBwb2x5X2NsZWFuX3NjcmVlbiwgcG9seV9wYXVzZSwgbmVlZF9jbGVhbiwgbmVlZF9wYXVzZSwgbmVlZF9saW5lLCBuZWVkX3JlY3QsIG5lZWRfZWxsaXBzZSA9IDAsIDAsIFs1LCA2LCA1XSwgMSwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgZm5vcCwgMCwgMCwgMSwgMSwgMVxuICB0cnk6XG4gICAgaWYgY2hyKDI1Nik9PWNocigwKTogIyBLaGlDQVMgUHl0aG9uIGNvbXBhdC5cbiAgICAgIG5lZWRfbGluZSA9IDBcbiAgICAgIG5lZWRfY2xlYW4gPSAxXG4gICAgICBzY3JlZW5fdywgc2NyZWVuX2ggPSAzMjAsIDIyMlxuICAgICAgZGVmIHBvbHlfc2V0X3BpeGVsKHgsIHksIGMpOlxuICAgICAgICBzZXRfcGl4ZWwoeCwgeSwgY29sM18yX3JnYihjLCBbNSw2LDVdLCAwKSlcbiAgICAgIHBvbHlfZHJhd19saW5lLCBwb2x5X2ZpbGxfcmVjdCwgcG9seV9maWxsX2VsbGlwc2UgPSBrYzE2X2RyYXdfbGluZSwga2MxNl9maWxsX3JlY3QsIGtjMTZfZmlsbF9lbGxpcHNlXG4gIGV4Y2VwdDpcbiAgICBwYXNzXG4gIGlmIG5vdCBzY3JlZW5fdzpcbiAgICBrYzE2X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfZmlsbF9lbGxpcHNlID0gTm9uZSwgTm9uZSwgTm9uZVxuICAgIHRyeTogIyBLaGlDQVMgTWljcm9weXRob25cbiAgICAgIGltcG9ydCBncmFwaGljXG4gICAgICBkZWYgcG9seV9kcmF3X2xpbmUoeDEsIHkxLCB4MiwgeTIsIGMpOlxuICAgICAgICBncmFwaGljLmRyYXdfbGluZShpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpLCBjb2wzXzJfcmdiKGMsIGNvbG9yX2JpdHMsIDEpKVxuICAgICAgZGVmIHBvbHlfZmlsbF9yZWN0KHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgICAgICAgZ3JhcGhpYy5kcmF3X2ZpbGxlZF9yZWN0YW5nbGUoaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKSwgYylcbiAgICAgIGRlZiBwb2x5X2ZpbGxfZWxsaXBzZSh4LCB5LCByeCwgcnksIGMpOlxuICAgICAgICBncmFwaGljLmRyYXdfZmlsbGVkX2FyYyhpbnQoeCksIGludCh5KSwgaW50KHJ4KSwgaW50KHJ5KSwgMCwgMzYwLCBjKVxuICAgICAgc2NyZWVuX3csIHNjcmVlbl9oLCBwb2x5X3NldF9waXhlbCwgbmVlZF9jbGVhbiwgbmVlZF9saW5lLCBuZWVkX3JlY3QsIG5lZWRfZWxsaXBzZSA9IDMyMCwgMjIyLCBncmFwaGljLnNldF9waXhlbCwgMSwgMCwgMCwgMFxuICAgIGV4Y2VwdDpcbiAgICAgIHBhc3NcbiAgaWYgbm90IHNjcmVlbl93OlxuICAgIHRyeTogIyBOdW1Xb3Jrc1xuICAgICAgaW1wb3J0IGthbmRpbnNreVxuICAgICAgc2NyZWVuX3csIHNjcmVlbl9oLCBwb2x5X3NldF9waXhlbCwgbmVlZF9yZWN0ID0gMzIwLCAyMjIsIGthbmRpbnNreS5zZXRfcGl4ZWwsIDBcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgICAga2FuZGluc2t5LmZpbGxfcmVjdChpbnQoeCksIGludCh5KSwgaW50KHcpLCBpbnQoaCksIGMpXG4gICAgZXhjZXB0OlxuICAgICAgcGFzc1xuICBpZiBuZWVkX2xpbmU6XG4gICAgZGVmIHBvbHlfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgICAgIG0sIGExLCBiMSwgYTIsIGIyID0gMCwgaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKVxuICAgICAgaWYgKHgyIC0geDEpICoqIDIgPCAoeTIgLSB5MSkgKiogMjpcbiAgICAgICAgbSwgYTEsIGEyLCBiMSwgYjIgPSAxLCBiMSwgYjIsIGExLCBhMlxuICAgICAgaWYgbWluKGExLCBhMikgIT0gYTE6IGExLCBiMSwgYTIsIGIyID0gYTIsIGIyLCBhMSwgYjFcbiAgICAgIGZvciBrIGluIHJhbmdlKGEyIC0gYTEgKyAxKTpcbiAgICAgICAgYSwgYiA9IGExICsgaywgaW50KGIxICsgKGIyIC0gYjEpICogayAvICgoYTIgLSBhMSkgb3IgMSkpXG4gICAgICAgIHBvbHlfc2V0X3BpeGVsKChhLCBiKVttXSwgKGIsIGEpW21dLCBjKVxuXG4gIGlmIG5lZWRfcmVjdDpcbiAgICBkZWYgcG9seV9maWxsX3JlY3QoeCwgeSwgdywgaCwgYyk6XG4gICAgICBmb3IgayBpbiByYW5nZShoKTpcbiAgICAgICAgcG9seV9kcmF3X2xpbmUoeCwgeSArIGssIHggKyB3IC0gMSwgeSArIGssIGMpXG5cbiAgaWYgbmVlZF9lbGxpcHNlOlxuICAgIGZyb20gbWF0aCBpbXBvcnQgc3FydFxuICAgIGRlZiBwb2x5X2ZpbGxfZWxsaXBzZSh4LCB5LCByeCwgcnksIGMpOlxuICAgICAgZm9yIGggaW4gcmFuZ2UoLXJ5LCByeSsxKTpcbiAgICAgICAgdyA9IHNxcnQobWF4KDAsIHJ4KnJ4KigxLWgqaC9yeS9yeSkpKVxuICAgICAgICB4MSwgeDIgPSB4IC0gdywgeCArIHdcbiAgICAgICAgeWMgPSB5ICsgaFxuICAgICAgICBwb2x5X2RyYXdfbGluZSh4MSwgeWMsIHgyLCB5YywgYylcblxuICBpZiBuZWVkX2NsZWFuOlxuICAgIGRlZiBwb2x5X2NsZWFuX3NjcmVlbigpOlxuICAgICAgcG9seV9maWxsX3JlY3QoMCwgMCwgc2NyZWVuX3csIHNjcmVlbl9oLCBbMjU1LCAyNTUsIDI1NV0pXG5cbiAgcmV0dXJuIHNjcmVlbl93LCBzY3JlZW5faCwgcG9seV9oYXNfY29sb3IsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfZmlsbF9lbGxpcHNlLCBwb2x5X2NsZWFuX3NjcmVlbiwgZm5vcFxuIn1dfQ==")));

    constructor() {
        this.onAuthStateChangedHandler = [];
        this.user = null;
        this.gists = null;
        
        window.localStorage.setItem('projects', TiPlanetConnector.__init_projects);
    }

    /**
     * @returns {TiPlanetConnector}
     */
    static getInstance() {
        if (TiPlanetConnector.__instance == null) {
            TiPlanetConnector.__instance = new TiPlanetConnector();
        }

        return this.__instance;
    }

    getUserName() {
        return "Dummy Name";
    }

    getUserPhotoURL() {
        return profile;
    }

    onAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler.push(changed_func);
    }

    removeAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler = this.onAuthStateChangedHandler.filter(element => element !== changed_func);
    }

    isLogged() {
        return true;
    }

    login(function_good, function_error) {
        function_good();
    }

    logout() {
        
    }

    getDefaultFileName(name) {
        var init_file_name = "";
        
        for(let i in name.toLowerCase()) {
            let char = name.toLowerCase()[i];
            if (TiPlanetConnector.__allowed_chars_file.includes(char)) {
                init_file_name += char;
            }
        }
        
        if (init_file_name.length === 0) {
            init_file_name = "main";
        }
        
        init_file_name += ".py";
        
        return init_file_name;
    }
    
    getDefaultFiles(name) {
        let files = {};
        
        files[this.getDefaultFileName(name)] = {
            "content": TiPlanetConnector.__init_file_content
        };
        
        return files;
    }

    getProjects(callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        let output = [];
        for (let name in projects) {
            output.push({
                "name": name,
                "files": [],
                "loaded": false,
                "loading": false,
                "selected": false
            });
        }
        
        console.log(output);

        callback(output);
    }

    loadProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }
        
        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        callback({
            "name": name,
            "files": projects[name],
            "loaded": true,
            "loading": false,
            "selected": true
        });
    }

    createProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] !== undefined) {
            callback(null);
            return;
        }
        
        projects[name] = [{
            "name": this.getDefaultFileName(name),
            "content": TiPlanetConnector.__init_file_content
        }];

        callback({
            "name": name,
            "files": projects[name],
            "loading": false,
            "loaded": true,
            "selected": true
        });
        
        window.localStorage.setItem('projects', JSON.stringify(projects));
    }

    renameProject(oldname, newname, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[oldname] === undefined) {
            callback(null, null);
            return;
        }
        
        projects[newname] = projects[oldname];
        delete projects[oldname];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(oldname, newname);
    }

    removeProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        delete projects[name];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(name);
    }

    saveProject(project, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[project.name] === undefined) {
            callback(null);
            return;
        }
        
        projects[project.name] = project.files;
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(project);
    }
}

