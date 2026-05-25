
// function findGapsImperative(
//   sortedCorrections: readonly Correction[],
//   documentLength: number,
// ): [number, number][] {
//   if (sortedCorrections.length === 0) return [[0, documentLength]];
//
//   const gaps: [number, number][] = [];
//   let frontier = sortedCorrections[0].range.end;
//
//   for (const correction of sortedCorrections.slice(1)) {
//     if (correction.range.start <= frontier) {
//       frontier = Math.max(frontier, correction.range.end);
//     } else {
//       gaps.push([frontier, correction.range.start]);
//       frontier = correction.range.end;
//     }
//   }
//
//   if (frontier < documentLength) {
//     gaps.push([frontier, documentLength]);
//   }
//
//   return gaps;
// }
//
//
// function findGaps(
//   sortedCorrections: readonly Correction[],
//   document: LintedDocument
// ): Interval[] {
//   if (sortedCorrections.length === 0) return [[0, document.content.length]];
//
//   const correctionIntervals: Interval[] = sortedCorrections.map(c => [c.range.start, c.range.end]);
//   const merge = multiUnion(...correctionIntervals);
//   const gaps = [...pairwise(merge)].map((ipair) => [ipair[0][1], ipair[1][0]] as Interval);
//
//   const lastInterval = merge[merge.length - 1];
//   if (lastInterval[1] < document.content.length) {
//     gaps.push([lastInterval[1], document.content.length]);
//   }
//
//   console.log("Merge", merge);
//   console.log("Gaps from merge", gaps);
//
//   return gaps;
// }
//
