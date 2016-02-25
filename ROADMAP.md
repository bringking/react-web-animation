#Roadmap 

##Upcoming features 

Below is a set of features we are aware of and would like to implement soon

- [ ] Remove Immutable dependency, a shallow comparison will work to compare the timing config
- [ ] Add start, finish and cancel event handlers as Props for Animation and AnimationGroup/AnimationSequence
- [ ] Add Prop for setting the current play speed
- [ ] Allow nesting of AnimationGroups and AnimationSequences
- [ ] Allow *hot* keyframe replacement by checking for equality on the timing config and if it hasn't changed, create the 
new animation from the new keyframes, but keeping it playing at the same `currentTime`
