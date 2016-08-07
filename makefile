SRCS = manifest.json content.css content.js niconico.css niconico.js
DSTS = webext.zip

$(DSTS): $(SRCS)
	rm -rf $(DSTS)
	7z a $(DSTS) $(SRCS)
