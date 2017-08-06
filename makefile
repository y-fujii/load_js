SRCS = manifest.json content.css content.js background.js simplify.css
DSTS = webext.zip

$(DSTS): $(SRCS)
	rm -rf $(DSTS)
	7z a $(DSTS) $(SRCS)
